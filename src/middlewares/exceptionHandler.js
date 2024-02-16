
function exceptionHandler(error, request, response, next) {
    console.error(error.response?.data);
    const status = error.response?.status || 400;
    response.status(status).send(error.response?.data.message);
}

module.exports = exceptionHandler;