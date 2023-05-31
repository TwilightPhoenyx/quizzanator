import { Op } from "sequelize";
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"

import { 
    User
} from "../models.mjs";

import exceptionHandler from "../exceptionHandler.mjs";


//POST 

//Sign In
async function controllerNewUser(request, response){
    try {
        const passwordFootprint = await hash(request.body.password, 10)
        const userData = {...request.body, passwordFootprint}
        await User.create(userData)
        response.status(201).send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}

//Login
async function controllerLogin (request, response){
    try {

        const user = await User.findOne({
            where: { username: request.body.username }
        })

        if ( user === null ) return response.sendStatus(401)

        const authenticated = await compare(
            request.body.password, user.passwordFootprint
        )

        if (authenticated) {
            const authPass = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
            return response.send(authPass)
        }

        return response.sendStatus(401)
        
    } catch (exception) {
        return exceptionHandler(exception, response)
    }
};


//GET

async function controllerLoadUserData(request, response) {
    try {
        const user = await User.findOne({
                attributes: ['profilePictureURL', 'username'],
                where: {
                    [Op.or]: [
                        { id: request.params.iduser}, 
                        { username: request.params.iduser}
                    ]
                }, 
            })
        response.status(200)
        response.send(user.toJSON()) 
    } catch (error) {
        exceptionHandler(exception, response)
    }
};


//PUT

async function controllerUpdateUser(request, response) {
    try {
        const user = await User.findByPk(response.locals.authorization.id)
        if ( ! user ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
        await user.update(request.body)
        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};

export {
    controllerNewUser,
    controllerLogin,
    controllerUpdateUser,
    controllerLoadUserData
}