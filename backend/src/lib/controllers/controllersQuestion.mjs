import { 
    Test,
    Question
} from "../models.mjs";

import exceptionHandler from "../exceptionHandler.mjs";


//POST

async function controllerNewQuestion(request, response) {  
    try {
        const test = await Test.findByPk(request.params.id)
        if ( ! test ) return response.status(404).send()
        const newQuestion = await test.createQuestion(request.body)
        const questionId = await Question.findByPk(newQuestion.id)
        const allAnswers = request.body.answers  //Tomamos el array con las respuestas

        allAnswers.forEach(answer => questionId.createAnswer(answer));
        response.status(201)
        response.status(201).send(newQuestion.toJSON())
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


//GET

async function controllerLoadQuestions(request, response) {     
    try {
        response.json(await Question.findByPk(request.query.id))
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


//PUT

async function controllerUpdateQuestion(request, response) {
    try {
        const questionId = await Question.findByPk(request.params.id)
        if ( ! questionId ) return response.status(404).send()
        const allAnswers = request.body.answers
        await questionId.update(request.body)
        const oldAnswers = await questionId.getAnswers() //Cargamos las respuestas antiguas
        questionId.removeAnswer(oldAnswers)

        oldAnswers.forEach(oldAnswer => oldAnswer.destroy())
        allAnswers.forEach(newAnswer => questionId.createAnswer(newAnswer))

        response.send("Ok!")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


//DELETE

async function controllerDeleteQuestion(request, response) {
    try {
        const questionToDelete = await Question.findByPk(request.params.id)
        await questionToDelete.destroy()
        response.status(200).send("Ok")
    } catch (exception) {
        exceptionHandler(exception, response)
    }
};


export {
    controllerNewQuestion,
    controllerLoadQuestions,
    controllerUpdateQuestion,
    controllerDeleteQuestion,
};