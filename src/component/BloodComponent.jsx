import { useEffect, useState } from "react";
import { useAuth } from "./LoginContext";
import classes from "./css/Home.module.css";
import { useNavigate } from "react-router-dom";

function BloodComponet({value}){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {user} = useAuth();
    const [selectedRow, setSelectedRow] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRowClick = (index) => {
        setSelectedRow(index); // Update the selected row index
    };

    async function handleBloodClick(){
        const url =  `http://localhost:8080/home/extract/${selectedRow}/${user?.id}`;
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setSuccess("You have succesfully got the blood!");
                navigate('/home');
            } else {
                const errorData = await response.text();
                setError(errorData.message || 'Error on the BE side'); // Display error message
            }
        } catch (error) {
            setError('Network error. Please try again later.'); // Handle network errors
        }
    }

    useEffect(() => {
        var url = "";
        if (value){
            url = 'http://localhost:8080/home/allBloods';
        } else {
            url = `http://localhost:8080/home/getBlood/${user?.email}`;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(url); 
                if (!response.ok) {
                    setError('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>; 
    }

    return (
        <div className={classes.main}>
            <h1>List of bloods</h1>
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Donor</th>
                        <th>Blood type</th>
                        <th>Receiver Id</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((str, index) => {
                        const arr = str.split(" ");
                        return (
                            <tr key={index} onClick={() => handleRowClick(arr[1])} className={arr[1]===selectedRow ? classes.selected : null}>
                                <td>{index}</td>
                                {arr.map((substring, subIndex) => (
                                    <td key={subIndex}>{substring}</td> // Render each substring in a separate <td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>

            </table>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className={classes.selBtn}>
                <button onClick={handleBloodClick} disabled={!selectedRow}>Select</button>
            </div>
        </div>
    );



}

export default BloodComponet;