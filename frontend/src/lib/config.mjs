const baseUrl = window.location.hostname === "localhost" ? "http://localhost:8000" : ""

const pathAPIVersion = "/api/v1.0"

const pathAPITest = "/test/"
const pathAPIQuestion = "/question/"
const pathAPIAnswer = "/answer/"
const pathAPIUser = "/user/"
const pathAPISession = "/session/"
const queryOptionalParamId = "?id="



export {
    baseUrl,
    pathAPIVersion,
    pathAPITest,
    pathAPIQuestion,
    pathAPIAnswer,
    pathAPIUser,
    pathAPISession,
    queryOptionalParamId
};