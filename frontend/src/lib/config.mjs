const baseUrl = ["localhost", "127.0.0.1"].includes(window.location.hostname) 
    ? "http://localhost:8000" 
    : ""

const pathAPIVersion = "/api/v1.0"

const pathAPITest = "/test/"
const pathAPIQuestion = "/question/"
const pathAPIAnswer = "/answer/"
const pathAPIUser = "/user/"
const pathAPISession = "/session/"
const queryOptionalParamId = "?id="
const queryOptionalParamUser = "?username="



export {
    baseUrl,
    pathAPIVersion,
    pathAPITest,
    pathAPIQuestion,
    pathAPIAnswer,
    pathAPIUser,
    pathAPISession,
    queryOptionalParamId,
    queryOptionalParamUser
};