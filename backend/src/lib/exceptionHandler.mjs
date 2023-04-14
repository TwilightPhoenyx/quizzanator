function exceptionHandler (exception, response) {
    console.error(exception)
    response.status(500).send()
}

export default exceptionHandler