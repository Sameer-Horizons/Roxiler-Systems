import { useState } from "react";
import { AppContext } from "./Context/AppContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Newstores() {
    const [storename, setStorename] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const { backendurl } = useContext(AppContext)

    const handleAdd = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;
            if (storename && address && email) {
                const { data } = await axios.post(backendurl + "/api/auth/Addingstore", { storename, address, email, })
                if (data.success) {
                    alert("success");
                    setStorename('')
                    setAddress('')
                    setEmail('')
                }

                else {
                    alert(data.message);
                }
            }
            else {
                alert("Please fill in all fields.");
            }
        } catch (error) {
            console.error("Axios request failed:", error);
        }
    }

    return (
        <>
        <button onClick={() => navigate("/SysAdmin")}>Back</button>
            <div className="form-container2">
                <p className="">Enter store name </p>
                <input type="text" value={storename} onChange={(e) => setStorename(e.target.value)} />
                <br />
                <p className="">Enter Address</p>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                <br />
                <p className="">Enter your Email</p>
                <input className="inputpass" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <button onClick={handleAdd}> + Add Store </button>
            </div>


        </>
    )

};

export default Newstores;