const express = require('express');
const login = require('../services/auth');
const router = express.Router();

router.post('/login', async (req, res, next) => {
    try{
        const username = req.body.username;
        const password = req.body.password;
        if(username && password){
            response = await login(username, password);
            res.send(response);
        }else{
            res.status(403).send("Username and password is required");
        }
    }catch(e){
        next(e);
    }
});

module.exports = router;