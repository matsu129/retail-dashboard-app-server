const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf-8', (err, json) => {
    if (err) return res.status(500).json({ error: 'fail'});
    res.json(JSON.parse(json));
  });
});

module.exports = router;