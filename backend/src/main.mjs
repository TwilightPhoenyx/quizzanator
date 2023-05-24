import express from "express";
import cors from "cors";

import { pathAPIVersion } from "./lib/config.mjs";

import { 
    controllerLoadTests,
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
    controllerLogin 
} from "./lib/controllers/controllersUsers.mjs";


const app = express()
app.use(cors())
app.use(express.json())


app.post(pathAPIVersion + "/test/", controllerNewTest)
app.post(pathAPIVersion + "/test/:id/question/", controllerNewQuestion)
app.post(pathAPIVersion + "/user/", controllerNewUser)
app.post(pathAPIVersion + "/session/", controllerLogin)

app.get(pathAPIVersion + "/test/",  controllerLoadTests) /* /test/ o /test/?id=xx donde xx es el id de un test */
app.get(pathAPIVersion + "/test/:id/question/",  controllerLoadQuestions)
app.get(pathAPIVersion + "/question/:id/answer/", controllerLoadAnswers)

app.put(pathAPIVersion + "/test/:id/stats/", controllerUpdateTestStats)
app.put(pathAPIVersion + "/test/:id", controllerUpdateTest)
app.put(pathAPIVersion + "/question/:id", controllerUpdateQuestion)

app.delete(pathAPIVersion + "/test/:id", controllerDeleteTest)
app.delete(pathAPIVersion + "/question/:id", controllerDeleteQuestion)


app.listen(process.env.PORT, ()=>{
    console.log("Express working...")
})