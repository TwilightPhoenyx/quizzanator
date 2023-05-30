import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect} from "react";
import { Context } from "../services/ContextComponent";
import defaultProfilePicture from "../img/icon-user-default.png"

import UserTestList from "../components/UserTestList";
import EditProfilePicture from "../components/EditProfilePicture";
import styles from "./styles/UserProfileView.module.css"

import { fetchLoadUserTests, fetchLoadTests } from "../lib/fetch/fetchTest.mjs";
import { queryOptionalParamUser } from "../lib/config.mjs";

function UserProfileView(){

    const params = useParams();
    const navigate = useNavigate();
    const { token, setNotification, sessionName } = useContext(Context);

    const [tests, setTests] = useState([])
    const [isPublic, setIsPublic] = useState(false)

    function handlerClickCreateTest(){
        navigate("/test_creation/");
    };

    useEffect(
        loadTests,
        []
    );

    function loadTests(){
        if (sessionName === params.username) {
            fetchLoadUserTests("", token, setTests, setNotification);
            setIsPublic(false)
            console.log(tests)
        } else {
            fetchLoadTests(
                "",   
                (queryOptionalParamUser + params.username),
                setTests,
                setNotification
            );
            setIsPublic(true)
        }
    };

    return(
        <div className={styles.profileContainer}>
            <div className={styles.userDataContainer}>
                <input type="image" className={styles.profilePicture} src={defaultProfilePicture} alt="foto de perfil" />
                <h1 className={styles.username}>{params.username}</h1>
            </div>
            {token && sessionName === params.username &&
                <div>
                    <button className={styles.resetMargins} onClick={handlerClickCreateTest}>
                        Crea test nuevo
                    </button>
                    <EditProfilePicture/>
                </div>
            }
            <UserTestList loadUserTests={loadTests} loadedTests={tests}  isPublic={isPublic}/>
        </div>
    );

};

export default UserProfileView;