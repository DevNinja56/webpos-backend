const { default: axios } = require("axios");
const getCurrentDateTime = require("../utils");


async function login(username, password) {
    const currentTime = getCurrentDateTime();
    console.log(currentTime);
    const response = await axios.post('https://api.giftlov.com/api/Base/generateToken', {
        username,
        password
    }, {'X-GIFTLOV-DATE': currentTime});
    if(response.status == 200){
        return {'token': response.data.token, 'expireDate': response.data.expireDate};
    }
    throw new Error(response.statusMessage).status(response.status)
}

module.exports = login