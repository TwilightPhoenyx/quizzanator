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
            notification("No se pudo iniciar sesión. Compruebe los datos")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};



//GET

async function fetchLoadUserData(userIdentifier, handlerResponse=()=>{}, notification) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIUser + userIdentifier,
            )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            notification("No se pudo obtener los elementos. Intentélo más tarde.")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};


//PUT

async function fetchUpdateUser(userData, jwt, handlerResponse=()=>{}, notification) {
    try {
        const userDataJSON = JSON.stringify(userData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIUser,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer "+jwt
                },
                body: userDataJSON
            }
        )
        if (response.ok) {
            handlerResponse(response)
        } else {
            notification("No se pudieron actualizar los datos.")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};

export {
    fetchNewUser,
    fetchNewSession,
    fetchLoadUserData,
    fetchUpdateUser
}