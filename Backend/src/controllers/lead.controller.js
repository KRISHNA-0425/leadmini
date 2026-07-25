import Lead from '../models/Lead.js';

// @desc    Create a lead (submitted from the public LeadForm)
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res, next) => {
  try {
    const { name, email, budget, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'name and email are required' });
    }

    const lead = await Lead.create({ name, email, budget, message });
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads (with optional status filter + pagination)
// @route   GET /api/leads?status=new&page=1&limit=20
// @access  Private
export const getLeads = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};

    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Lead.countDocuments(filter);

    res.json({
      leads,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single lead by id
// @route   GET /api/leads/:id
// @access  Private
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a lead's status (e.g. new -> contacted -> closed)
// @route   PATCH /api/leads/:id
// @access  Private
export const updateLead = async (req, res, next) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    if (status) lead.status = status;
    await lead.save();

    res.json(lead);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    await lead.deleteOne();
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Dashboard summary stats (counts by status)
// @route   GET /api/leads/stats/summary
// @access  Private
export const getLeadStats = async (req, res, next) => {
  try {
    const stats = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const summary = { new: 0, contacted: 0, closed: 0, total: 0 };
    stats.forEach((s) => {
      summary[s._id] = s.count;
      summary.total += s.count;
    });

    res.json(summary);
  } catch (error) {
    next(error);
  }
};