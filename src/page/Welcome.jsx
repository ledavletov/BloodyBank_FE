import WelcomeComponent from "../component/WelcomeComponent";
import classes from "./css/Welcome.module.css";

function Welcome(){

    return (
        <div className={classes.main}>
            <WelcomeComponent />
        </div>
    )
}

export default Welcome;