import express from "express"
import cors from "cors"

import { 
    controllerDeleteTest,
    controllerLoadTests,
    controllerNewTest,
    controllerNewQuestion,
    controllerLoadQuestions,
    controllerUpdateTest
} from "./lib/controllers.mjs"

const app = express()
app.use(cors())
app.use(express.json())


app.post("/test/", controllerNewTest)
app.post("/test/:id/question/", controllerNewQuestion)

app.get("/test/",  controllerLoadTests)
app.get("/test/:id/question/",  controllerLoadQuestions)

app.put("/test/:id/", controllerUpdateTest)

app.delete("/test/", controllerDeleteTest)

/*
    app.get("/test/:id",  (pet, resp)=>{
        pet.params.id
    })
    app.get("/test/",  (pet, resp)=>{ // /test?id=33&legth=33    pet.query.id
    })
*/

app.listen(8000, ()=>{
    console.log("Express working...")
})