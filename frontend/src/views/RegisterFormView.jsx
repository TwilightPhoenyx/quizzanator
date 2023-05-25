import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewUser, fetchNewSession } from "../lib/fetch/fetchUser.mjs";

import InputText from "../components/InputText";
import styles from "./styles/Forms.module.css";

function RegisterFormView(){

    const { token } = useContext(Context);
    const navigate = useNavigate();

    const stateUsername = useState("");
    const [username, setUsername] = stateUsername;
    const statePassword = useState("");
    const [password, setPassword] = statePassword;
    const stateEmail = useState("");
    const [email, setEmail] = stateEmail


    function handlerClickSubmit(){
        fetchNewUser (
            { username, password, email},
            handlerResponse
        );
    };

    function handlerResponse(_){
        alert("Regsitro completado")
        navigate("/login/")
    };

    return(
        <>
            <h2>¡Regístrate para poder crear tus propios Tests!</h2>
            <form>
                <fieldset>
                    <legend>Introduce tus datos</legend>
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
                    <InputText 
                        id="email"
                        stateValue={stateEmail} 
                        type="email" 
                        maxLength="25"
                        placeholder="ejemplo@abc.es"
                    />
                    <button type="button" onClick={handlerClickSubmit}>Enviar</button>
                </fieldset>
                <Link to="/login/">
                    <span className="link">Si ya tienes cuenta, inicia sesión</span>
                </Link>
            </form>
        </>
    );
};

export default RegisterFormView;