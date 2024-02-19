const { default: axios } = require("axios");
const { getCurrentDateTime } = require("../utils/utils");


async function login(username, password) {
    const currentTime = getCurrentDateTime();
    const response = await axios.post(process.env.GENERATE_TOKEN_URL, {
        username,
        password
    }, {'X-GIFTLOV-DATE': currentTime});
    if(response.status == 200){
        return {'token': response.data.token, 'expireDate': response.data.expireDate};
    }
    throw new Error(response.statusMessage).status(response.status)
}

module.exports = login