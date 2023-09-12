import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./SearchBar.css"

const SearchBar = ({ data  }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setselectedArea] = useState(null); 
  const [selectedField, setselectedField] = useState(null);
  const [selectedDate, setselectedDate] = useState(null);
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    history.push({
      pathname: '/SearchedData',
      state: {
        selectedArea,
        selectedField,
        selectedDate,
        searchTerm
      },
    });
  };
  return (
    <div className="inputContainer">
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="검색어를 입력해주세요..."
          className="inputField"
           
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>
    </div>
  );
};

export default SearchBar;
