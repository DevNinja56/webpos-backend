const express = require('express');
const { getItems } = require('../services/catalogue');
const Item = require('../modals/Item');
const router = express.Router();

router.get('/items', async(req, res, next) => {
    try{
        req.meta = {url: 'items'}
        const items = await Item.find();
        res.send({"items": items});
    }catch(e){
        next(e);
    }
});

module.exports = router;