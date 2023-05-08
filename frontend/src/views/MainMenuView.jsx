import { Link } from "react-router-dom";
import quizzanatorLogo from "../img/quizzanator_logo2.png"
import quizzanatorTitle from "../img/text-image.png"

import styles from "./styles/MainMenuView.module.css"

function MainMenuView(){

    return(
        <>
            <div className={styles.mainMenu}>
                <img className={styles.quizzanatorLogo} src={quizzanatorLogo} alt="Application logo"></img>
                <img className={styles.quizzanatorTitle} src={quizzanatorTitle} alt="QUIZZANATOR"></img>
                <Link to={"/test_list"} className={styles.linkToList}>¡Empecemos!</Link>
            </div>
        </>
    );

};

export default MainMenuView