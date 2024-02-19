const { default: axios } = require("axios");
const { getSignature, getCurrentDateTime } = require("../utils/utils");
const Item = require("../modals/Item");
const login = require("./auth");

async function getItems(req) {
    const currentTime = getCurrentDateTime();
    const signature = getSignature(req, currentTime);
    const response = await axios.get(`https://api.giftlov.com/api/Base/items`, {
        params: {
            current: req.query.current,
            rowCount: req.query.rowCount,
            lang: req.query.lang,
        },
        headers: { 
            'X-GIFTLOV-DATE': currentTime, 
            'Authorization': req.headers['authorization'], 
            'Signature': signature 
        }
    },);
    if (response.status == 200) {
        return response.data;
    }
    throw new Error(response.statusMessage).status(response.status)
}

async function syncItems() {
        try{
        response = await login('coding_challenge_1', 'coding_challenge_1');
        const req = {
            headers: {
                authorization: response.token
            },
            query: {
                current: 1,
                rowCount: 100,
                lang: 'EN'
            },
            method: 'GET',
            meta: {
                url: 'items'
            }
        }
        const items = await getItems(req);
        //reset data in database
        await Item.deleteMany({});
        await Item.insertMany(items['items']);
        
        console.log("Items Synchronised Successfully");
    }catch(e){
        console.error("Error Synchronisign database: ", e);
    }
}

module.exports = { getItems, syncItems };