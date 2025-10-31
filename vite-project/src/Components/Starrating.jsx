import { useContext, useState } from "react"
import { AppContext } from "../Context/AppContext"
import axios from "axios";

export default function Starrating({ starCount = 5, productId }) {
    const [savedStarValue, setSavedStarValue] = useState(0);
    const [pendingStarValue, setPendingStarValue] = useState(0);
    const [starvalue, setStarvalue] = useState(0);
    const [hovervalue, setHovervalue] = useState()
    const { backendurl } = useContext(AppContext)
    console.log(starvalue)

    const saveRatingToDatabase = async () => {
        if (pendingStarValue === 0) {
            alert("Please select a rating before saving.");
            return;
        }
        try {
            const ratingData = {
                productId: productId,
                rating: pendingStarValue,
            };
            let requestPromise;
            if (savedStarValue > 0) {
                requestPromise = axios.put(backendurl + "/api/auth/rating", ratingData);
            } else {
                requestPromise = axios.post(backendurl + "/api/auth/rating", ratingData);
            }
            const data = await requestPromise;
        }
        catch (error) {

            console.error("Error saving rating:", error);
            if (error.response) {
                console.error("Backend Error Message:", error.response.data.message); // <-- This will now show the detailed error
                alert("Failed to save rating: " + error.response.data.message);
            } else {
                alert("Failed to save rating (Network error).");
            }
        }
    };

    const handleStarClick = (index) => {
        setPendingStarValue(index + 1);
    };

    const displayValue = hovervalue || pendingStarValue || savedStarValue;
    
    return (
        <>
            <div>
                {
                    new Array(starCount).fill(0).map((value, index) => {
                        return <span key={index}
                            className={
                                index < displayValue ? "gold" : ""
                            }
                            onClick={() => { handleStarClick(index) }}
                            onMouseEnter={() => { setHovervalue(index + 1) }}
                            onMouseLeave={() => { setHovervalue(0) }}
                            style={{ cursor: 'pointer' }}
                        >
                            &#9733;
                        </span>
                    })
                }
            </div>
            <button onClick={saveRatingToDatabase}>
                {savedStarValue > 0 ? "Modify/Re-submit Rating" : "Submit Rating"}
            </button>
            <p>Current pending selection: {pendingStarValue || 'None'}</p>
        </>
    )
}