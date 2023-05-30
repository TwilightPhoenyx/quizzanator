import { useContext, useRef, useState } from "react";
import { aDataURL } from "../lib/fileManagement.mjs";
import { Context } from "../services/ContextComponent";

import { fetchUpdateUser } from "../lib/fetch/fetchUser.mjs";

function EditProfilePicture(){

    const { token } = useContext(Context)
    const modalEditProfile = useRef()
    const [profilePictureURL, setProfilePictureURL] = useState("")

    function handlerShowModal(){
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
/*
    function handlerSubmitImage(event){
        fetchUpdateUser(
            { profilePictureURL },
            token,
            handlerResponse,
            setNotification
        )
    };

    function handlerResponse(_) {
        loadData()
        navigate("/test_creation/"+ TestId)
    };
*/
    return(
        <>
            <button onClick={handlerShowModal}>Editar perfil</button>
            <dialog ref={modalEditProfile}>
                <input type="file" accept="image/jpeg, image/png" onInput={handlerAvatar}/>
                <button>Subir imagen</button>
                <button onClick={handlerCloseModal}>Cerrar</button>
            </dialog>
        </>
    );
};

export default EditProfilePicture;