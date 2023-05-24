import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewSession } from "../lib/fetch/fetchUser.mjs";

import RegisterFormView from "./RegisterFormView.jsx";
import InputText from "../components/InputText";
import styles from "./styles/Forms.module.css";

function LoginFormView(){

    const { token, setToken, sessionName, setSessionName } = useContext(Context);
    const navigate = useNavigate();

    const stateUsername = useState("");
    const [username, setUsername] = stateUsername;
    const statePassword = useState("");
    const [password, setPassword] = statePassword;


    useEffect(
        ()=>{ 
            console.log(username, password, token)
        },
        [username, password, token]
    );

    function handlerClickSubmit(){
        fetchNewSession (
            { username, password },
            handlerResponse
        );
    };

    function handlerResponse(response){
        setToken(response)
        setSessionName(username)
        alert("Bienvenid@, " + username)
        navigate("/")
    };

    return(
        <form>
            <fieldset>
                <legend>Inicia sesión</legend>
                <InputText 
                    id="username" 
                    stateValue={stateUsername} 
                    type="text" 
                    maxLength="20"
                    placeholder="Nombre de usuario"
                />
                <InputText 
                    id="password" 
                    stateValue={statePassword} 
                    type="password" 
                    maxLength="25"
                    placeholder="Contraseña"
                />
                <button type="button" onClick={handlerClickSubmit}>Enviar</button>
            </fieldset>
            <Link to="/sign_up/">
                <span className="link">¿No tienes cuenta? Regsitrate aquí</span>
            </Link>
        </form>
    );
};

export default LoginFormView;