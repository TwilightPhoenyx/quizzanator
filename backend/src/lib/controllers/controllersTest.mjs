import { 
    Test, User
} from "../models.mjs";

import exceptionHandler from "../exceptionHandler.mjs";


//POST

async function controllerNewTest(request, response) {
    try {
        const testData = {...request.body, UserId: response.locals.authorization.id}
        const newTest = await Test.create(testData)
        response.status(201).send(newTest.toJSON())
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


//GET

async function controllerLoadTests(request, response) {
    if (request.query.id) {
        try {
            const test = await Test.findOne({
                where: {id: request.query.id}
            })
            if ( ! test ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
            response.status(200)
            response.send(test.toJSON()) 
        } catch (error) {
            exceptionHandler(exception, response)
        }
    } else if (request.query.username) {
        try {
            const user = await User.findOne({
                where: {username: request.query.username}
            })
            if ( ! user ) return response.status(404).send()
            response.status(200)
            response.json(await user.getTests(
                {where: {isPublished: true}}
                )
            )
        } catch (exception) {
            exceptionHandler(exception, response)
        }
    } else {
        try {
            response.status(200)
            response.json(await Test.findAll(
                {where: {isPublished: true}}
                )
            )
        } catch (exception) {
            exceptionHandler(exception, response)
        }
    }

};

async function controllerLoadUserTests(request, response) {
    if (request.query.id) {
        try {
            const test = await Test.findOne({
                where: {id: request.query.id, UserId: response.locals.authorization.id}
            })
            response.status(200)
            response.send(test.toJSON()) 
        } catch (error) {
            exceptionHandler(exception, response)
        }
    } else {
        try {
            response.status(200)
            response.json(await Test.findAll(
                {where: {UserId: response.locals.authorization.id}}
                )
            )
        } catch (exception) {
            exceptionHandler(exception, response)
        }
    }

};


//PUT

async function controllerUpdateTest(request, response) {
    try {
        const testData = {...request.body, UserId: response.locals.authorization.id}
        const test = await Test.findByPk(request.params.id)
        if ( ! test ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
        await test.update(testData)
        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};

async function controllerUpdateTestStats(request, response) {
    try {
        const test = await Test.findByPk(request.params.id)
        const {averageScore, timesCompleted, numberOfLikes, numberOfDislikes} = request.body
        if ( ! test ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
        await test.update({averageScore, timesCompleted, numberOfLikes, numberOfDislikes})
        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


//DELETE

async function controllerDeleteTest(request, response) {
    try {
        const testToDelete = await Test.findByPk(request.params.id)
        await testToDelete.destroy()
        response.status(200).send("Ok")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


export {
    controllerNewTest,
    controllerLoadTests,
    controllerLoadUserTests,
    controllerUpdateTest,
    controllerUpdateTestStats,
    controllerDeleteTest
}