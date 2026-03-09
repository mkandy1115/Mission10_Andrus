import type { Bowler } from "./types/Bowler";
import { useEffect, useState } from "react";

function BowlerList(){

    // Store the list of bowlers in component state
    const [Bowlers, setBowlers] = useState<Bowler[]>([]);

    // Get bowler data from the backend
    useEffect(() => {
        // Async function to fetch bowler data
        const fetchBowler = async () =>{
            const response = await fetch('https://localhost:5000/api/BowlingLeague');
            const data = await response.json();
            setBowlers(data);
        };

        // Save fetched data into state
        fetchBowler();
    }, []);

    // Render the bowler table
    return(
        <>
            <h3>Bowlers</h3>
            <table>
                <thead>
                    <tr>
                    <th>Bowler Name</th>
                    <th>Team Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Loop through bowlers and create one row per bowler */}
                    {Bowlers.map((b, index) => (
                    <tr key={index}>
                        <td>{b.bowlerName}</td>
                        <td>{b.teamName}</td>
                        <td>{b.address}</td>
                        <td>{b.city}</td>
                        <td>{b.state}</td>
                        <td>{b.zip}</td>
                        <td>{b.phoneNumber}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}





export default BowlerList;