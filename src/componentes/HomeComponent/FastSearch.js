import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FastSearch.css";
import { useHistory } from 'react-router-dom';




const FastSearch = () => {
    
    const history = useHistory();

    const [selectedArea, setselectedArea] = useState(null); 
    const [selectedField, setselectedField] = useState(null);
    const [selectedDate, setselectedDate] = useState(null);
    const areaOptions = ["서울", "부산", "대구", "인천", "광주", "대전", "울산","세종","경기","강원","충북","충남","전남","경북","경남","제주"];
    const fieldOptions = ["연극", "음악", "무용","미술","기타"];

    const handleAreaSelect = (area) => {
        if (selectedArea === area) {
          setselectedArea(null); // 이미 선택된 항목을 누르면 선택 해제
        } else {
          setselectedArea(area);
        }
    };
    
    const handleFieldSelect = (field) => {
        if (selectedField === field) { // 이미 선택된 항목을 누르면 선택 해제          
          setselectedField(null);
        } else {
          setselectedField(field);
        }
    };

    const handleSearchClick = async () => {
        if(!selectedArea){
          alert("지역을 선택하세요!");
          return;
        }
        try {
          const selectedDateStr = selectedDate ? selectedDate.toISOString().slice(0, 10).replace(/-/g, "") : "";
          history.push({
            pathname: '/SearchedData',
            state: {
              selectedArea,
              selectedField,
              selectedDate: selectedDateStr,
            },
          });
        } catch (error) {
          console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };
    return(
        <div className="side-box">
          <p style={{ fontSize: 22 }}>빠른검색</p>
          <div className="button-container">
            <p>지역  </p>
            {areaOptions.map((area, index) => (
              <button
                key={index}
                onClick={() => handleAreaSelect(area)}
                className={`button ${selectedArea === area ? "selected" : ""}`}
              >
                {area}
              </button>
            ))}
          </div>
          <div className="button-container">
            <p>분야  </p>
            {fieldOptions.map((field, index) => (
              <button
                key={index}
                onClick={() => handleFieldSelect(field)}
                className={`button ${selectedField === field ? "selected" : ""}`}
              >
                {field}
              </button>
            ))}
          </div>
          <div className="select-container">
            <p>날짜 : </p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setselectedDate(date)}
              placeholderText="날짜를 선택하세요"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <button onClick={handleSearchClick}>검색</button>
        </div>
    )
}

export default FastSearch;
