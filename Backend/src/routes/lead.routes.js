import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
} from '../controllers/lead.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { leadCreateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public - hit by the LeadForm.jsx submission
router.post('/', leadCreateLimiter, createLead);

// Private - admin dashboard
router.get('/stats/summary', protect, getLeadStats);
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.patch('/:id', protect, updateLead);
router.delete('/:id', protect, deleteLead);

export default router;