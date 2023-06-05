import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../services/ContextComponent.jsx";
import quizzanatorLogo from "../img/quizzanator_logo2.png"
import quizzanatorTitle from "../img/text-image.png"

import styles from "./styles/MainMenuView.module.css"

function MainMenuView(){

    const { token } = useContext(Context);

    return(
        <>
            <div className={styles.mainMenu}>
                <img className={styles.quizzanatorLogo} src={quizzanatorLogo} alt="Application logo"></img>
                <img className={styles.quizzanatorTitle} src={quizzanatorTitle} alt="QUIZZANATOR"></img>
                <Link to={"/test_list"} className={styles.importantLink}>
                    ⮞ <span className={styles.italicText}>¡Empecemos!</span> ⮜
                </Link>
                <Link to={token ? "/test_creation" : "/sign_up"} className="link">
                    <span>Prueba también a crear tus propios test</span>
                </Link>
            </div>
        </>
    );

};

export default MainMenuView