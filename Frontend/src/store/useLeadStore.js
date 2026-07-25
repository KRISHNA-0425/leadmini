import { create } from 'zustand';
import { api } from '../lib/axios';

export const useLeadStore = create((set) => ({
  leads: [],
  isSubmitting: false,
  error: null,

  addLead: async (formData) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await api.post('/leads', formData);
      set({ isSubmitting: false });
      return { success: true, lead: res.data };
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Submission failed',
        isSubmitting: false,
      });
      return { success: false };
    }
  },

  fetchLeads: async (params = {}) => {
    const res = await api.get('/leads', { params });
    set({ leads: res.data.leads });
    return res.data;
  },

  updateLeadStatus: async (id, status) => {
    const res = await api.patch(`/leads/${id}`, { status });
    set((state) => ({
      leads: state.leads.map((l) => (l._id === id ? res.data : l)),
    }));
  },

  deleteLead: async (id) => {
    await api.delete(`/leads/${id}`);
    set((state) => ({ leads: state.leads.filter((l) => l._id !== id) }));
  },
}));