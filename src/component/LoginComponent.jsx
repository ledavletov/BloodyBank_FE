import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent(){
    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" ref={email} required> </input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" ref={password} required> </input>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;