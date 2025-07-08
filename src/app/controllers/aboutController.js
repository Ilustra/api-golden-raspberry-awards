const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;