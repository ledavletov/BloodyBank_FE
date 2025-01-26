import BloodComponet from "../component/BloodComponent";
import classes from "./css/Welcome.module.css";

function Blood({value}){
    return (
        <div className={classes.main}>
            <BloodComponet value={value}/>
        </div>
    )
}

export default Blood;