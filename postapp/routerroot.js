const router = require('express').Router();

router.get('/', (req,res) => {
    res.render('./App.js');
});

router.post('/', (req,res) => {
    res.render('./App.js');
})