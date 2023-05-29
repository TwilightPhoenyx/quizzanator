import { baseUrl, pathAPIVersion, pathAPIUser, pathAPISession} from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

//Sign In
async function fetchNewUser(userData, handlerResponse=()=>{}, notification) {
    try {
        const userDataJSON = JSON.stringify(userData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIUser,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userDataJSON
            }
        )
        if (response.ok) {
            handlerResponse(response)
        } else {
            if (response.status === 400) {
                notification("El nombre de usuario ya existe")
            } else {
                notification("Error al crear la cuenta")
            }
            
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};

//Login
async function fetchNewSession(userData, handlerResponse=()=>{}, notification) {
    try {
        const userDataJSON = JSON.stringify(userData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPISession,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userDataJSON
            }
        )
        if (response.ok) {
            const token = await response.text()
            handlerResponse(token)
        } else {
            console.log(response)
            notification("No se pudo iniciar sesión. Compruebe los datos")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};

export {
    fetchNewUser,
    fetchNewSession,
}