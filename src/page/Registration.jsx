import RegistrationComponent from "../component/RegistrationComponent";
import classes from "./css/Welcome.module.css";

function Registration(){

    return (
    <div className={classes.main}>
        <RegistrationComponent />
    </div>)
}

export default Registration;