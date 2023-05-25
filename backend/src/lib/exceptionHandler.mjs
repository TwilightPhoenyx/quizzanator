function exceptionHandler (exception, response) {

    switch (exception.name) {
        case "SequelizeUniqueConstraintError":
            console.error(exception);
            response.status(400).send();
            break;
        default:
            console.log (exception.name)
            console.error(exception)
            response.status(500).send()
    }
}

export default exceptionHandler