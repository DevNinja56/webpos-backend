const express = require('express');
const { getItems } = require('../services/catalogue');
const router = express.Router();

router.get('/items', async(req, res, next) => {
    try{
        req.meta = {url: 'items'}
        const data = await getItems(req);
        res.send(data);
    }catch(e){
        next(e);
    }
});

module.exports = router;