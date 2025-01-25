import classes from "./css/Welcome.module.css";
import logoImage from "./pics/Logo.jpg";
import { useNavigate } from "react-router-dom";

function WelcomeComponent(){
    const navigate = useNavigate();

    function directToLogin(){
        navigate('/login');
    }

    function directToRegister(){
        navigate('/register');
    }

    return (
        <div className={classes.main}>
            <h1  className={classes.hh}>Welcome to BloodBank</h1>
            <img src={logoImage} className={classes.image} />
            <button onClick={directToLogin} className={classes.btn}>Existed user</button>
            <button onClick={directToRegister} className={classes.btn}>Create a new user</button>
        </div>
    )
}



export default WelcomeComponent;