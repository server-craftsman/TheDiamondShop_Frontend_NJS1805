import React, { useState } from 'react';
import "../searchProduct-page/index.scss";
import { SearchBar } from '../../components/searchAllProduct/SearchBar';
import { SearchResultsList } from '../../components/searchAllProduct/SearchResultsList';


function SearchAllProduct() {
    const [results, setResults] = useState([]);

    return (
      <div className='search-product'>
        <h1>Search All Product</h1>

        <div className='search-bar-container'>
           <SearchBar setResults={setResults} />
            {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>

      </div>
        
    )
}

export default SearchAllProduct;