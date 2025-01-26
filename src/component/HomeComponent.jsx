import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./LoginContext";
import classes from "./css/Home.module.css";
import logoImage from "./pics/logobank.jpg";



function HomeComponent(){

    const navigate = useNavigate();
    const {user} = useAuth();
    const intro = "BloodyBank is a modern blood bank management platform designed to connect donors, and recipients.Our mission is to ensure timely, efficient, and secure access to blood when it’s needed most.";
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function handleDonate(){
        try {
            const url = `http://localhost:8080/home/donate/${user?.email}`;
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setSuccess("You have succesfully donated the blood!");
            } else {
                const errorData = await response.text();
                setError(errorData.message || 'Error on the BE side'); // Display error message
            }
        } catch (error) {
            setError('Network error. Please try again later.'); // Handle network errors
        }
    }

    function handleExtract(){
        navigate("/blood", {state: false});
    }

    function handleAll(){
        navigate("/blood/all", {state: {allBlood: true}});
    }

    return (
        <div className={classes.main}>
                <img src={logoImage} className={classes.image} />
                <div className={classes.user}>
                    {user?.name} {user?.surname}
                </div>
                <table>
                    <tr>
                        <td>Email Address</td>
                        <td>{user?.email}</td>
                    </tr>
                    <tr>
                        <td>Number of donations</td>
                        <td>{user?.bloodCount}</td>
                    </tr>
                    <tr>
                        <td>Blood type</td>
                        <td>{user?.bloodName}</td>
                    </tr>
                </table>
                <div class={classes.btnDiv}>
                    <button onClick={handleDonate} className={classes.btn}>Donate</button>
                    <button onClick={handleExtract}>Get Blood</button>
                </div>
                {success && <p style={{ color: 'green' }}>{success}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className={classes.btnAll}>
                    <span  onClick={handleAll}>Check all blood transactions</span>
                </div>
                <div className={classes.about}>
                    <div>About Us</div>
                    <div>{intro}</div>
                    

What We Offer

Donor Management: Easy registration, profile management, and donation tracking.
Recipient Matching: Efficient matching of recipients with compatible donors.
Inventory Tools: Real-time monitoring of blood stock levels and usage.
Appointment Scheduling: Simplified booking with reminders for donations.
Secure Data: Robust protection of user and patient information.
                </div>
        </div>
    )
}

export default HomeComponent;