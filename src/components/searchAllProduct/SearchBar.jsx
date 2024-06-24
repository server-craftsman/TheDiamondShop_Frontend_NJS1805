import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../searchAllProduct/SearchBar.scss";

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

    // const fetchData = (value) => {
    //     fetch("http://localhost:8090/products/bridals")
    //         .then((response) => response.json())
    //         .then((json) => {
    //             const results = json.filter((brials) => {
    //                 return (
    //                     value &&
    //                     brials &&
    //                     brials.NameBridal &&
    //                     brials.NameBridal.toLowerCase().includes(value)
    //                 );
    //             });
    //             setResults(results);
    //         });
    // };

    const fetchData = (value) => {
        const fetchBridals = fetch("http://localhost:8090/products/bridals").then((response) => response.json());
        const fetchDiamonds = fetch("http://localhost:8090/products/diamonds").then((response) => response.json());

        Promise.all([fetchBridals, fetchDiamonds]).then(([bridals, diamonds]) => {
            const filteredBridals = bridals.filter((bridal) => {
                return bridal.NameBridal.toLowerCase().includes(value.toLowerCase());
            });

            const filteredDiamonds = diamonds.filter((diamond) => {
                return diamond.DiamondOrigin.toLowerCase().includes(value.toLowerCase());
            });

            const combinedResults = [...filteredBridals, ...filteredDiamonds];
            setResults(combinedResults);
        }).catch((error) => {
            console.error('Error fetching data:');
        });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">

            <input
                placeholder="Search..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            <FaSearch id="search-icon" />
        </div>
    );
};
