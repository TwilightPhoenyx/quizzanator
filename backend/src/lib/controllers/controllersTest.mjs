import { 
    Test
} from "../models.mjs";

import exceptionHandler from "../exceptionHandler.mjs";


//POST

async function controllerNewTest(request, response) {
    try {
        const newTest = await Test.create(request.body)
        response.status(201).send(newTest.toJSON())
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


//GET

async function controllerLoadTests(request, response) {
    if (request.query.id) {
        try {
            const test = await Test.findByPk(request.query.id)
            if ( ! test ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
            response.status(200)
            response.send(test.toJSON()) 
        } catch (error) {
            exceptionHandler(exception, response)
        }
    } else {
        try {
            response.status(200)
            response.json(await Test.findAll())
        } catch (exception) {
            exceptionHandler(exception, response)
        }
    }

};


//PUT

async function controllerUpdateTest(request, response) {
    try {
        const test = await Test.findByPk(request.params.id)
        if ( ! test ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
        await test.update(request.body)
        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};

async function controllerUpdateTestStats(request, response) {
    try {
        const test = await Test.findByPk(request.params.id)
        if ( ! test ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
        await test.update(
            {
                averageScore: request.body.averageScore, 
                timesCompleted: request.body.timesCompleted,
                numberOfLikes: request.body.numberOfLikes,
                numberOfDislikes: request.body.numberOfDislikes
            }
            )
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
    controllerUpdateTest,
    controllerUpdateTestStats,
    controllerDeleteTest
}