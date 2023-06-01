import { useContext, useEffect, useRef, useState } from "react";
import { aDataURL } from "../lib/fileManagement.mjs";
import { Context } from "../services/ContextComponent";
import defaultProfilePicture from "../img/icon-user-default.png"

import { fetchUpdateUser } from "../lib/fetch/fetchUser.mjs";

import styles from "./styles/EditProfilePicture.module.css"


function EditProfilePicture({loadUser, profilePicture}){

    const { token, setNotification } = useContext(Context)
    const modalEditProfile = useRef()
    const [profilePictureURL, setProfilePictureURL] = useState(profilePicture)

    function handlerShowModal(){
        setProfilePictureURL(profilePicture)
        modalEditProfile.current.showModal()
    }

    function handlerCloseModal(){
        modalEditProfile.current.close()
    }

    function handlerAvatar(event) {
        const image = event.target.files[0]
        if (image) aDataURL(image, setProfilePictureURL)
        else setProfilePictureURL("")
    }

    function handlerSubmitImage(event){
        fetchUpdateUser(
            { profilePictureURL },
            token,
            handlerResponse,
            setNotification
        )
    };

    function handlerResponse(_) {
        loadUser()
        modalEditProfile.current.close()
    };

    return(
        <>
            <button onClick={handlerShowModal}>Editar perfil</button>
            <dialog  ref={modalEditProfile}>
                <div className={styles.editProfileContainer}>
                    <img 
                        className={styles.avatarPreview}
                        src={profilePictureURL ? profilePictureURL : defaultProfilePicture}
                        alt="foto de perfil" 
                    />
                    <input 
                        type="file" 
                        className={styles.buttonSelectImg} 
                        accept="image/jpeg, image/png" 
                        onInput={handlerAvatar}
                    />
                    <button onClick={handlerSubmitImage}>Subir imagen</button>
                    <button onClick={handlerCloseModal}>Cerrar</button>
                </div>
            </dialog>
        </>
    );
};

export default EditProfilePicture;