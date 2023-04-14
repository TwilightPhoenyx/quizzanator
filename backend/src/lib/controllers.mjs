import { 
    User, 
    Test,
    Question,
    Answer 
} from "./models.mjs";

import exceptionHandler from "./exceptionHandler.mjs";

async function controllerNewTest(request, response) {
    try {
        const newTest = await Test.create(request.body)
        response.status(201).send(newTest.toJSON())
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}

async function controllerLoadTests(_, response) {
    try {
        response.json(await Test.findAll())
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}

async function controllerUpdateTest(request, response) {
    try {
        const test = await Test.findByPk(request.params.id)
        if ( ! test ) return response.status(404).send() //Si el valor esta vacio devolvemos excepcion
        await test.update(request.body)
        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}

async function controllerDeleteTest(request, response) {
    try {
        const testToDelete = await Test.findByPk(request.body.id)
        await testToDelete.destroy()
        response.status(200).send("Ok")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}

async function controllerNewQuestion(request, response) {
    try {
        const test = await Test.findByPk(request.params.id)
        if ( ! test ) return response.status(404).send()
        const newQuestion = await test.createQuestion(request.body)
        const questionId = await Question.findByPk(newQuestion.id)
        const allAnswers = request.body.Answers  //Tomamos el array con las respuestas

        allAnswers.forEach(answer => questionId.createAnswer(answer));
        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}

async function controllerLoadQuestions(request, response) {
    try {
        response.json(await Question.findByPk(request.query.id))
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}



export {
    controllerNewTest,
    controllerLoadTests,
    controllerDeleteTest,
    controllerNewQuestion,
    controllerLoadQuestions,
    controllerUpdateTest
}