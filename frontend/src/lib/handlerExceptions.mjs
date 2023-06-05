function handlerExceptions(exception, notification) {
    console.error(exception)
    notification(exception)
}

export default handlerExceptions