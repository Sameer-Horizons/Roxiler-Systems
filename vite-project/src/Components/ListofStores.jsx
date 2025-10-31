import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import myimg from '../assets/Screenshot_2025-removebg-preview.png'
import Starrating from "./Starrating";

export default function ListofStores() {
    const [stores, setStores] = useState([])
    const [filterQuery, setFilterQuery] = useState('');
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getstores');
                setStores(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchStores();
    }, [])
    const handleFilterChange = (event) => {
        setFilterQuery(event.target.value);
    };

    const filteredUsers = useMemo(() => {
        if (!filterQuery) {
            return stores;
        }
        const lowerCaseQuery = filterQuery.toLowerCase();
        return stores.filter(store => {
            const nameMatch = store.storename.toLowerCase().includes(lowerCaseQuery);
            const addressMatch = String(store.address || '').toLowerCase().includes(lowerCaseQuery);

            return nameMatch ||  addressMatch;
        });
    }, [stores, filterQuery]);

    return (
        <>
            <nav className="Nav">
                <div >
                    <img className="logoimg" src={myimg} />
                </div>
                <ul className="Navlist">
                    <li>Home </li>
                    <li>Contact Us </li>
                    <li onClick={() => navigate("/")} >Log out</li>
                </ul>
            </nav>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by Name or Address"
                    value={filterQuery}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>
            <h2>List of stores</h2>
            
            
            <div className="user-item">
                {
                    filteredUsers.map(store => (
                        <div key={store._id} className="user-card">
                            <h3 className="user-card-h3">{store.storename}</h3>
                            <p>Address : {store.address}</p>
                            <Starrating productId={store._id} />

                        </div>
                    ))
                }
                
            </div>
        </>
    )
}







