import { useRef } from "react";

function EditProfilePicture(){

    const modalEditProfile = useRef()

    function handlerShowModal(){
        modalEditProfile.current.showModal()
    }

    function handlerCloseModal(){
        modalEditProfile.current.close()
    }

    return(
        <>
            <button onClick={handlerShowModal}>Editar perfil</button>
            <dialog ref={modalEditProfile}>
                <input type="file" accept="image/jpeg, image/png"/>
                <button onClick={handlerCloseModal}>Cerrar</button>
            </dialog>
        </>
    );
};

export default EditProfilePicture;