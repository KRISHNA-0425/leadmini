import { motion } from 'framer-motion';
import { useLeadStore } from '../store/useLeadStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';

export default function Admin() {
  const { leads, searchQuery, setSearchQuery, updateLeadStatus, fetchLeads } = useLeadStore();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filteredLeads = leads.filter(lead =>
    (lead.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lead.email ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-6 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Pipeline Console</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage and track incoming data streams.</p>
        </div>
        <button onClick={logout} className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          Terminate Session
        </button>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Filter pipeline by identifier or vector..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pl-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none transition-all shadow-sm"
        />
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
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
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                key={lead._id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors gap-4"
              >
                <div>
                  <p className="font-semibold text-lg">{lead.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{lead.email} &bull; Tier: {lead.budget}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 max-w-xl">{lead.message}</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className={`h-2 w-2 rounded-full ${lead.status === 'New' ? 'bg-blue-500' : lead.status === 'Contacted' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                    className="p-2 text-sm font-medium border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-950 cursor-pointer outline-none w-full md:w-auto"
                  >
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Closed">Status: Closed</option>
                  </select>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}