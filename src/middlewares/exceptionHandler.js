
function exceptionHandler(error, request, response, next) {
    const errorMessage = error.message ?? error.response?.data;
    const status = error.status ?? error.response?.status ?? 400;
    console.error(errorMessage);
    response.status(status).send(errorMessage);
}

module.exports = exceptionHandler;