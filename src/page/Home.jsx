import HomeComponent from "../component/HomeComponent";
import classes from "./css/Welcome.module.css";

function Home(){

    return(
        <div className={classes.main}>
            <HomeComponent />
        </div>
    )
}

export default Home;