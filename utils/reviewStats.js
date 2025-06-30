function calculateAverageScores(reviews) {
  const summary = new Map();

  reviews.forEach(r => {
    const id = String(r.productId);
    if (!summary.has(id)) {
      summary.set(id, { total: 0, count: 0 });
    }
    const data = summary.get(id);
    data.total += r.stars;
    data.count += 1;
  });

  const result = {};
  for (const [productId, { total, count }] of summary.entries()) {
    result[productId] = (total / count).toFixed(2);
  }
  return result;
}

const positiveWords = /\b(great|good|excellent|love|amazing|perfect|cute)\b/i;
const negativeWords = /\b(bad|disappoint|broken|worst|terrible|poor|cheap)\b/i;

function analyzeReviewSentiment(reviews) {
  const summary = new Map();

  reviews.forEach(r => {
    const id = String(r.productId);
    if (!summary.has(id)) {
      summary.set(id, { positive: 0, negative: 0});
    }
    const data = summary.get(id);
    const comment = r.comment.toLowerCase();

    if (positiveWords.test(comment)) data.positive++;
    if (negativeWords.test(comment)) data.negative++;
  });

  return Object.fromEntries(summary.entries());
}

module.exports = {
  calculateAverageScores,
  analyzeReviewSentiment
};