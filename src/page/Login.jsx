import LoginComponent from "../component/LoginComponent";
import classes from "./css/Welcome.module.css";


function Login(){

    return (
        <div className={classes.main}>
            <LoginComponent />
        </div>
    )
}

export default Login;