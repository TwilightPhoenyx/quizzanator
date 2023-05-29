import { useNavigate, useParams } from "react-router-dom";
import { useContext} from "react";
import { Context } from "../services/ContextComponent";
import defaultProfilePicture from "../img/icon-user-default.png"

import UserTestList from "../components/UserTestList";
import EditProfilePicture from "../components/EditProfilePicture";
import styles from "./styles/UserProfileView.module.css"

function UserProfileView(){

    const params = useParams();
    const navigate = useNavigate();
    const { token } = useContext(Context);

    function handlerClickCreateTest(){
        navigate("/test_creation/");
    };

    return(
        <div className={styles.profileContainer}>
            <div className={styles.userDataContainer}>
                <input type="image" className={styles.profilePicture} src={defaultProfilePicture} alt="foto de perfil" />
                <h1 className={styles.username}>{params.username}</h1>
            </div>
            {token && 
                <button className={styles.resetMargins} onClick={handlerClickCreateTest}>
                    Crea test nuevo
                </button>
            }
            <EditProfilePicture/>
            <UserTestList/>
        </div>
    );

};

export default UserProfileView;