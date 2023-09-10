import React from 'react';

const SearchedData = (props) => {
    const { selectedArea, selectedField,selectedDate } = props;
    const mapCodeToField = (code) => {
        switch (code) {
          case "연극":
            return "A000";
          case "음악":
            return "B000";
          case "무용":
            return "C000";
          case "미술":
            return "D000";
          case "기타":
            return "L000";
          default:
            return code; // 기본값으로 코드를 그대로 반환
        }
    };
    const fieldcode = mapCodeToField(selectedField);

    return (
      <div>
        <h2>검색 결과</h2>
        <p>선택한 지역: {selectedArea}</p>
        <p>선택한 분야: {fieldcode}</p>
        <p>선택한 날짜: {selectedDate}</p>
      </div>
    );
};

export default SearchedData;
