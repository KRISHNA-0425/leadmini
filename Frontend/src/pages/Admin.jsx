import { motion, AnimatePresence } from 'framer-motion';
import { useLeadStore } from '../store/useLeadStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useState } from 'react';

const STATUS_LABELS = { new: 'New', contacted: 'Contacted', closed: 'Closed' };
const STATUS_DOT = { new: 'bg-blue-500', contacted: 'bg-amber-500', closed: 'bg-emerald-500' };

export default function Admin() {
  const {
    leads,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    showActiveOnly,
    setShowActiveOnly,
    updateLeadStatus,
    deleteLead,
    fetchLeads,
  } = useLeadStore();
  const logout = useAuthStore((state) => state.logout);

  const [selectedLead, setSelectedLead] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const openLead = (lead) => {
    setSelectedLead(lead);
    setPendingStatus(lead.status);
  };

  const closeModal = () => {
    setSelectedLead(null);
    setPendingStatus(null);
    setConfirmingDelete(false);
  };

  const saveStatus = async () => {
    if (!selectedLead || pendingStatus === selectedLead.status) return;
    setIsSaving(true);
    try {
      const updated = await updateLeadStatus(selectedLead._id, pendingStatus);
      setSelectedLead(updated);
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLead) return;
    try {
      await deleteLead(selectedLead._id);
      closeModal();
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  let filteredLeads = leads.filter((lead) =>
    (lead.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.email ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showActiveOnly) {
    filteredLeads = filteredLeads.filter((lead) => lead.status !== 'closed');
  }

  filteredLeads = [...filteredLeads].sort((a, b) => {
    const diff = new Date(a.createdAt) - new Date(b.createdAt);
    return sortOrder === 'newest' ? -diff : diff;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-6 py-12 text-zinc-900 dark:text-zinc-100"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          {/* Fixed heading color for both light and dark themes */}
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-600 dark:text-zinc-100">Pipeline Console</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manage and track incoming data streams.</p>
        </div>
        <button onClick={logout} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          Terminate Session
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Filter pipeline by identifier or vector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none transition-all shadow-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-4 text-sm font-medium border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 outline-none cursor-pointer text-zinc-900 dark:text-zinc-100"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        <button
          onClick={() => setShowActiveOnly(!showActiveOnly)}
          className={`p-4 text-sm font-medium rounded-xl border transition-colors whitespace-nowrap ${
            showActiveOnly
              ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100'
          }`}
        >
          Active only
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 dark:text-zinc-400">
            Pipeline is currently empty. Awaiting telemetry.
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filteredLeads.map((lead, i) => (
              <motion.li
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                key={lead._id}
                onClick={() => openLead(lead)}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors gap-4 cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{lead.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{lead.email} &bull; Tier: {lead.budget || '—'}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 max-w-xl line-clamp-1">{lead.message}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${STATUS_DOT[lead.status]}`} />
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{STATUS_LABELS[lead.status]}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg p-8 text-zinc-900 dark:text-zinc-100"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{selectedLead.name}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{selectedLead.email}</p>
                </div>
                <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-2xl leading-none">
                  &times;
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Budget</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedLead.budget || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Message</p>
                  <p className="text-sm whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">{selectedLead.message || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">Submitted</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <select
                  value={pendingStatus}
                  onChange={(e) => setPendingStatus(e.target.value)}
                  className="flex-1 p-3 text-sm font-medium border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-950 outline-none cursor-pointer text-zinc-900 dark:text-zinc-100"
                >
                  <option value="new">Status: New</option>
                  <option value="contacted">Status: Contacted</option>
                  <option value="closed">Status: Closed</option>
                </select>
                <button
                  onClick={saveStatus}
                  disabled={isSaving || pendingStatus === selectedLead.status}
                  className="px-5 py-3 text-sm font-medium rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {confirmingDelete ? (
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-1">Delete this lead permanently?</p>
                    <button
                      onClick={() => setConfirmingDelete(false)}
                      className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Confirm delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingDelete(true)}
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Delete lead
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}