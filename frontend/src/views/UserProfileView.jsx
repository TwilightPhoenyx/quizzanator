import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect} from "react";
import { Context } from "../services/ContextComponent";
import defaultProfilePicture from "../img/icon-user-default.png"

import UserTestList from "../components/UserTestList";
import EditProfilePicture from "../components/EditProfilePicture";
import styles from "./styles/UserProfileView.module.css"

import { fetchLoadUserTests, fetchLoadTests } from "../lib/fetch/fetchTest.mjs";
import { fetchLoadUserData } from "../lib/fetch/fetchUser.mjs";
import { queryOptionalParamUser } from "../lib/config.mjs";

function UserProfileView(){

    const params = useParams();
    const navigate = useNavigate();
    const { token, setNotification, sessionName } = useContext(Context);

    const [tests, setTests] = useState([])
    const [userData, setUserData] = useState([])
    const [isPublic, setIsPublic] = useState(false)

    useEffect(
        ()=>{
            loadTests();
            loadUser();
        },
        [params]
    );

    function loadUser(){
        fetchLoadUserData(params.username, setUserData, setNotification);
    };

    function loadTests(){
        if (sessionName === params.username) {
            fetchLoadUserTests("", token, setTests, setNotification);
            setIsPublic(false)
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

    function handlerClickCreateTest(){
        navigate("/test_creation/");
    };

    return(
        <div className={styles.profileContainer}>
            <div className={styles.userDataContainer}>
                <img 
                    className={styles.profilePicture} 
                    src={userData.profilePictureURL ? userData.profilePictureURL : defaultProfilePicture}
                    alt="foto de perfil" 
                />
                <h1 className={styles.username}>{params.username}</h1>
            </div>
            {token && sessionName === params.username &&
                <div>
                    <button className={styles.resetMargins} onClick={handlerClickCreateTest}>
                        Crea test nuevo
                    </button>
                    <EditProfilePicture loadUser={loadUser}/>
                </div>
            }
            <UserTestList loadUserTests={loadTests} loadedTests={tests}  isPublic={isPublic}/>
        </div>
    );

};

export default UserProfileView;