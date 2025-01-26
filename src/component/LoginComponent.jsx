import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./css/Registration.module.css";
import { useAuth } from "./LoginContext";

function LoginComponent(){
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState(false);
    const {user, setUser} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: email.current.value,
            password: password.current.value
        };

        try {
            const response = await fetch('http://localhost:8080/registration/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const user = await response.json();
                setUser(user);
                navigate('/home'); // Redirect to home on success
            } else {
                const errorData = await response.text();
                setError(errorData.message || 'Wrong credentials'); // Display error message
            }
        } catch (error) {
            setError('Network error. Please try again later.'); // Handle network errors
        }
    }

    return (
        <div className={classes.main}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.block}>
                    <label>Email</label>
                    <input type="text" ref={email} required />
                </div>
                <div className={classes.block}>
                    <label>Password</label>
                    <input type="password" ref={password} required />
                </div>
                <div className={classes.btnDiv}>
                    <button type="submit">Login</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}

export default LoginComponent;