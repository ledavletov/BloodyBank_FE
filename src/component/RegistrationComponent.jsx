import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./css/Registration.module.css";

function RegistrationComponent(){
    //refs store the content of the input fields
    //refs differnt to state by the fact that update of the state value leads to the refresh of the screen
    const name = useRef();
    const surname = useRef();
    const email = useRef();
    const password = useRef();
    const [pswDuplciate, setDuplicate] = useState('');
    const [pswMatch, setPswMatch] = useState(true);
    const [error, setError] = useState(false);
    const age = useRef();

    const [selectedOption, setSelectedOption] = useState('');

    //content of the blood type
    const options = [
        { value: 'A', label: '1st group (A)' },
        { value: 'B', label: '2nd group (B)' },
        { value: 'O', label: '3rd group (O)' },
        { value: 'AB', label: '4th group (AB)' },
    ];

    //stores teh selected blood type
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    //used to change the urls
    const navigate = useNavigate();

    //used to check whether two passwords match
    function checkPassword(a){
        setPswMatch(a == password.current.value);
    }

    //TODO: make sure button is not active unless passwords match

    //call to the BE
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pswMatch) return;

        const payload = {
            name: name.current.value,
            surname: surname.current.value,
            email: email.current.value,
            password: password.current.value,
            bloodType: selectedOption,
            age: age.current.value
        };

        try {
            const response = await fetch('http://localhost:8080/registration/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                navigate('/login'); // Redirect to home on success
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed.'); // Display error message
            }
        } catch (error) {
            setError('Network error. Please try again later.'); // Handle network errors
        }
    }

    return (
        <div className={classes.main}>
            <h2>Create a new user</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.block}>
                    <label>Name</label>
                    <input type="text" ref={name} required/>
                </div>
                <div className={classes.block}>
                    <label>Surname</label>
                    <input type="text" ref={surname} required/>
                </div>
                <div className={classes.block}>
                    <label>Email</label>
                    <input type="text" ref={email} required/>
                </div>
                <div className={classes.block}> 
                    <label>Password</label> 
                    <input type="password" ref={password} required/>
                </div>
                <div className={classes.block}>
                    <label>Confirm Password</label>
                    <input type="password" value={pswDuplciate} onChange={(e) => {
                        setDuplicate(e.target.value);
                        checkPassword(e.target.value);
                    }} required/>
                    {!pswMatch && <p style={{ color: 'red' }}>Passwords do not match.</p>} 
                </div>
                <div className={classes.block}>
                    <label>Age</label>
                    <input type="text" ref={age} required/>
                </div>
                <div className={classes.block}>
                    <select value={selectedOption} onChange={handleSelectChange}>
                        <option value="" disabled>Select an option</option> {/* Placeholder option */}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.btnDiv}>
                    <button type="submit">Register</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )

}

export default RegistrationComponent;