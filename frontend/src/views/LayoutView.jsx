import { Link } from "react-router-dom";

function LayoutView(){

    return(
        <>
            <h1>BIENVENIDO</h1>
            <Link to={"/test_list"}><button>Ver Tests</button></Link>
        </>
    );

};

export default LayoutView