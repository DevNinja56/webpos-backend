const express = require('express');
const Item = require('../modals/Item');
const router = express.Router();

router.get('/items', async(req, res, next) => {
    try{
        const items = await Item.find();
        res.send({"items": items});
    }catch(e){
        next(e);
    }
});

module.exports = router;