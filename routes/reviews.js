const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const reviewsFile = path.join(__dirname, '../data/reviews.json');

router.get('/', (req, res) => {
  fs.readFile(reviewsFile, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error:'Failed to read reviews'});

    try {
      const reviews = JSON.parse(data);
      res.json(reviews);
    } catch (parseErr) {
      res.status(500).json({ error: 'Inbalid JSON format' });
    }
  });
});

router.post('/', (req, res) => {
  const { productId, stars, comment } = req.body;

  if (!productId || !stars || !comment) {
    return res.status(400).json({ error: 'Missing fields'});
  }

  fs.readFile(reviewsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });

    let reviews = [];
    try {
      reviews = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: 'Invalid JSON format'});
    }

    reviews.push({ productId, stars, comment });
    fs.writeFile(reviewsFile, JSON.stringify(reviews, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: 'Failed to write file'});

      res.status(201).json({ message: 'Review added successfully'});
    });
  });
});

module.exports = router;