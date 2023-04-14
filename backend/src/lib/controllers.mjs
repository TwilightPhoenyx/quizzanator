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
        const testToDelete = await Test.findByPk(request.params.id)
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

async function controllerUpdateQuestion(request, response) {
    try {
        const questionId = await Question.findByPk(request.params.id)
        if ( ! questionId ) return response.status(404).send()
        const allAnswers = request.body.Answers
        await questionId.update(request.body)
        const oldAnswers = await questionId.getAnswers() //Cargamos las respuestas antiguas
        questionId.removeAnswer(oldAnswers)

        oldAnswers.forEach(oldAnswer => oldAnswer.destroy())
        allAnswers.forEach(newAnswer => questionId.createAnswer(newAnswer))

        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
}

async function controllerDeleteQuestion(request, response) {
    try {
        const questionToDelete = await Question.findByPk(request.params.id)
        await questionToDelete.destroy()
        response.status(200).send("Ok")
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
    controllerUpdateQuestion,
    controllerDeleteQuestion,
    controllerLoadQuestions,
    controllerUpdateTest
}