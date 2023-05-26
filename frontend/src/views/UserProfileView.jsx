import { useParams } from "react-router-dom";
import defaultProfilePicture from "../img/icon-user-default.png"

import UserTestList from "../components/UserTestList";
import styles from "./styles/UserProfileView.module.css"

function UserProfileView(){

    const params = useParams();

    return(
        <div className={styles.profileContainer}>
            <div className={styles.userDataContainer}>
                <img className={styles.profilePicture} src={defaultProfilePicture} alt="foto de perfil" />
                <h1 className={styles.username}>{params.username}</h1>
            </div>
            <UserTestList/>
        </div>
    );

};

export default UserProfileView;