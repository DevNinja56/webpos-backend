const { HttpStatusCode } = require('axios');
const crypto = require('crypto');

/**
 * 
 * @returns current date and time in this format ddMMyyyyHHmmss in UTC timezone
 */
function getCurrentDateTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    // concatinating '0' before every entiry and getting last 2 characters.
    const month = ('0' + (now.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + now.getUTCDate()).slice(-2);
    const hours = ('0' + now.getUTCHours()).slice(-2);
    const minutes = ('0' + now.getUTCMinutes()).slice(-2);
    const seconds = ('0' + now.getUTCSeconds()).slice(-2);
    
    return `${day}${month}${year}${hours}${minutes}${seconds}`;
}


function generateSignature(url, method, params, xGiftlovDate, authToken, apiEncryptionKey) {
    // sorting params in lexicographic order.
    const sortedParams = Object.entries(params).sort((a, b) => String(a[1]).localeCompare(String(b[1])));
    // combining sorted params in a string.
    const mappedParams = sortedParams.map(([key, value]) => value).join('');

    let signatureString = `${url}${method.toUpperCase()}${mappedParams}${xGiftlovDate}${authToken}`;
    return crypto.createHmac('sha512', apiEncryptionKey).update(signatureString).digest('hex');
}

function getSignature(req, currentTime, method) {
    const requestMethod = method ?? req.method;
    const requestParams = Object.assign(req.query);
    const authToken = req.headers['authorization'];
    const apiEncryptionKey = process.env.SECRET_KEY;

    if(!authToken){
        throw new Error("Authorization header missing", HttpStatusCode.Unauthorized);
    }
    return generateSignature(req.meta.url, requestMethod, requestParams, currentTime, authToken, apiEncryptionKey);
}

module.exports = {getCurrentDateTime, getSignature};