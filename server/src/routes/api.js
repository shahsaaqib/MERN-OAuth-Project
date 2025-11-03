const express = require('express');
const axios = require('axios');
const ensureAuth = require('../middleware/ensureAuth');
const Search = require('../models/Search');
const router = express.Router();

const UNSPLASH_BASE = 'https://api.unsplash.com';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// top searches
router.get('/top-searches', async (req, res) => {
  try {
    const agg = await Search.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.json(agg.map(a => ({ term: a._id, count: a.count })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// search (protected)
router.post('/search', ensureAuth, async (req, res) => {
  try {
    const { term, page = 1, per_page = 20 } = req.body;
    if (!term) return res.status(400).json({ error: 'term required' });

    const unsplashRes = await axios.get(`${UNSPLASH_BASE}/search/photos`, {
      params: { query: term, page, per_page },
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
    });

    const results = unsplashRes.data.results || [];
    await Search.create({
      userId: req.user._id,
      term,
      timestamp: new Date(),
      resultsCount: results.length
    });

    res.json({ total: unsplashRes.data.total, results });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// history (protected)
router.get('/history', ensureAuth, async (req, res) => {
  try {
    const list = await Search.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(100);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
