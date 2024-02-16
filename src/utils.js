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

module.exports = getCurrentDateTime;