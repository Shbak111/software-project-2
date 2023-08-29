import React, { useState } from 'react';
import "../TourComponent/SearchBar.css"

const SearchBar = ({ data  }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="inputContainer">
      <div className="search">
        <input
          type="text"
          className="inputField"
          placeholder="검색어를 입력해주세요..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;