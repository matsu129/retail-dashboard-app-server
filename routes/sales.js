const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const salesPath = path.join(__dirname, '../data/sales.json');

router.get('/', (req, res) =>{
  if (fs.existsSync(salesPath)) {
    const data = JSON.parse(fs.readFileSync(salesPath, 'utf-8'));
    res.json(data);
  } else {
    res.json([]);
  }
});
module.exports = router;