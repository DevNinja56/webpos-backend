const { default: axios } = require("axios");
const { getCurrentDateTime, getSignature } = require("../utils/utils");


async function placeOrder(req, data) {
    try{
        const currentTime = getCurrentDateTime();
        req.meta = {url: 'placeOrder'};
        const signature = getSignature(req, currentTime);
        const config = {
            headers: {
                'X-GIFTLOV-DATE': currentTime, 
                'Authorization': req.headers['authorization'], 
                'Signature': signature 
            }
        }
        const response = await axios.post('https://api.giftlov.com/api/Base/placeOrder', data, config);
        if(response.status == 200){
            return {'token': response.data.id, 'expireDate': response.data.referenceNumber};
        }
        throw new Error(response.statusMessage).status(response.status)
    }catch(e){
        throw(e);
    }
}

module.exports = placeOrder