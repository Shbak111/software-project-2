import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "./FastSearch.css";
import FetchLocalData from "../FetchLocalData";

const FastSearch = () => {
    

    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedField, setSelectedField] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const areaOptions = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "제주"];
    const fieldOptions = ["공연", "축제", "뮤지컬"];
    const [data, setData] = useState([]);
    const handleAreaSelect = (area) => {
        if (selectedArea === area) {
          // 이미 선택된 항목을 누르면 선택 해제
          setSelectedArea(null);
        } else {
          setSelectedArea(area);
        }
    };
    
    const handleFieldSelect = (field) => {
        if (selectedField === field) {
          // 이미 선택된 항목을 누르면 선택 해제
          setSelectedField(null);
        } else {
          setSelectedField(field);
        }
    };

    const handleSearchClick = async () => {
        if(!selectedArea){
            alert("지역을 선택하세요!");
            return;
        }
        try {
            // 선택한 지역 정보를 사용하여 FetchLocalData 호출
            const fetchedLocalData = await FetchLocalData({ local: selectedArea });
    
            // 가져온 데이터를 상태로 업데이트
            setData(fetchedLocalData);
    
            // 기타 작업 수행
            console.log("검색 결과 데이터:", fetchedLocalData);
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
              onChange={(date) => setSelectedDate(date)}
              placeholderText="날짜를 선택하세요"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <button onClick={handleSearchClick}>검색</button>
        </div>

    )
    

}

export default FastSearch;