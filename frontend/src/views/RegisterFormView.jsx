import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewUser } from "../lib/fetch/fetchUser.mjs";

import InputText from "../components/InputText";
import styles from "./styles/Forms.module.css";

function RegisterFormView(){

    const { token, setNotification } = useContext(Context);
    const navigate = useNavigate();

    const regExp = /[a-zA-Z]/g;
    const stateUsername = useState("");
    const [username, setUsername] = stateUsername;
    const statePassword = useState("");
    const [password, setPassword] = statePassword;
    const statePasswordConfirm = useState("");
    const [passwordConfirm, setPasswordConfirm] = statePasswordConfirm;
    const stateEmail = useState("");
    const [email, setEmail] = stateEmail


    function handlerClickSubmit(){
        if(regExp.test(username)){
            if (password === passwordConfirm) {
                fetchNewUser (
                    { username, password, email},
                    handlerResponse,
                    setNotification
                );
            } else {
                setNotification("Confirme correctamente su contraseña")
                setPassword("")
                setPasswordConfirm("")
            }
        } else {
            setNotification("El Nombre de Usuario debe contener al menos 1 letra")
            setUsername("")
        }
    };

    function handlerResponse(_){
        setNotification("Regsitro completado")
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
                        id="password-confirmation" 
                        stateValue={statePasswordConfirm} 
                        type="password" 
                        maxLength="25"
                        placeholder="Confirmar la contraseña"
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