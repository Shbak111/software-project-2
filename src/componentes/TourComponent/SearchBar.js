import React, { useState } from 'react';
import "../TourComponent/SearchBar.css"

const SearchBar = ({ data, onSearch  }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneTitle, setZoneTitle] = useState('관광지 추천코스'); // Default title

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
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