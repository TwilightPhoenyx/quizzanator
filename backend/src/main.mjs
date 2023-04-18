import express from "express";
import cors from "cors";

import { 
    controllerLoadTests,
    controllerNewTest,
    controllerUpdateTest,
    controllerDeleteTest,
} from "./lib/controllers/controllersTest.mjs";

import { 
    controllerNewQuestion,
    controllerLoadQuestions,
    controllerUpdateQuestion,
    controllerDeleteQuestion
} from "./lib/controllers/controllersQuestion.mjs";


const app = express()
app.use(cors())
app.use(express.json())


app.post("/test/", controllerNewTest)
app.post("/test/:id/question/", controllerNewQuestion)

app.get("/test/",  controllerLoadTests) // /test/ o /test/?id=xx donde xx es el DI del test especifico
app.get("/test/:id/question/",  controllerLoadQuestions)

app.put("/test/:id/", controllerUpdateTest)
app.put("/question/:id/", controllerUpdateQuestion)

app.delete("/test/:id/", controllerDeleteTest)
app.delete("/question/:id/", controllerDeleteQuestion)


app.listen(8000, ()=>{
    console.log("Express working...")
})