const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { titile: 'My Express App', message: 'Hello' });
});

module.exports = router;