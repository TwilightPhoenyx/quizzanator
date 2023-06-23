import express from "express";
import cors from "cors";

import { pathAPIVersion } from "./lib/config.mjs";

import { 
    controllerLoadTests,
    controllerLoadUserTests,
    controllerNewTest,
    controllerUpdateTest,
    controllerUpdateTestStats,
    controllerDeleteTest,
} from "./lib/controllers/controllersTest.mjs";

import { 
    controllerNewQuestion,
    controllerLoadQuestions,
    controllerLoadAnswers,
    controllerUpdateQuestion,
    controllerDeleteQuestion
} from "./lib/controllers/controllersQuestion.mjs";

import { 
    controllerNewUser,
    controllerLogin,
    controllerUpdateUser,
    controllerLoadUserData 
} from "./lib/controllers/controllersUsers.mjs";

import { middlewareAuthorization } from "./lib/controllers/middleware.mjs";


const app = express()
app.use(
    cors({
        origin: process.env.CORS_ORIGIN ?? "*",
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
)
app.use(express.json({ limit: '8Mb' }))


app.post(pathAPIVersion + "/test/", middlewareAuthorization, controllerNewTest)
app.post(pathAPIVersion + "/test/:id/question/", middlewareAuthorization, controllerNewQuestion)
app.post(pathAPIVersion + "/user/", controllerNewUser)
app.post(pathAPIVersion + "/session/", controllerLogin)

app.get(pathAPIVersion + "/test/", controllerLoadTests) /* /?id=xx /?username=xxxx */
app.get(pathAPIVersion + "/test/:id/question/",  controllerLoadQuestions)
app.get(pathAPIVersion + "/question/:id/answer/", controllerLoadAnswers)
app.get(pathAPIVersion + "/user/test/", middlewareAuthorization, controllerLoadUserTests)
app.get(pathAPIVersion + "/user/:iduser", controllerLoadUserData)

app.put(pathAPIVersion + "/test/:id/stats/", controllerUpdateTestStats)
app.put(pathAPIVersion + "/test/:id", middlewareAuthorization, controllerUpdateTest)
app.put(pathAPIVersion + "/question/:id", middlewareAuthorization, controllerUpdateQuestion)
app.put(pathAPIVersion + "/user/", middlewareAuthorization, controllerUpdateUser)

app.delete(pathAPIVersion + "/test/:id", middlewareAuthorization, controllerDeleteTest)
app.delete(pathAPIVersion + "/question/:id", middlewareAuthorization, controllerDeleteQuestion)


app.listen(process.env.PORT, ()=>{
    console.log("Express working...")
})