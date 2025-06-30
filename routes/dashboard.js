const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { calculateAverageScores, analyzeReviewSentiment } = require('../utils/reviewStats');

const reviewsPath = path.join(__dirname, '../data/reviews.json');

function readReviews() {
  return fs.existsSync(reviewsPath) ? JSON.parse(fs.readFileSync(reviewsPath, 'utf-8')) : [];
}

router.get('/analysis', (req, res) => {
  const reviews = readReviews();
  const avgScores = calculateAverageScores(reviews);
  const sentiments = analyzeReviewSentiment(reviews);
  res.json({ avgScores, sentiments });
});

module.exports = router;