import React, { useEffect, useState } from 'react';
import FetchLocalData from "../componentes/FetchLocalData";
import FetchGenreData from '../componentes/FetchGenreData';
import { Link } from 'react-router-dom';
import "../css/SearchedData.css"
import { useLocation } from 'react-router-dom';
const SearchedData = (props) => {
  const location = useLocation();
  const { selectedArea, selectedField, selectedDate,searchTerm } = location.state;;
  const [data, setData] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [NoData, setNoData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 표시할 항목 수
  const pagesPerGroup = 5; // 한 그룹당 페이지 수
  
  const mapFieldToCode = (code) => {
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
  const fieldcode = mapFieldToCode(selectedField);

  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedArea!=null&&selectedField == null) {  // 지역만 선택하고 분야는 선택하지 않았을 경우
          const dataA = await FetchGenreData({ code: "A000" });
          const dataB = await FetchGenreData({ code: "B000" });
          const dataC = await FetchGenreData({ code: "C000" });
          const dataD = await FetchGenreData({ code: "D000" });
          const dataL = await FetchGenreData({ code: "L000" });

          // 데이터 합치기
          const fetchedData = [...dataA, ...dataB, ...dataC, ...dataD, ...dataL];
          // 고른 지역 필터링
          const filteredData = fetchedData.filter(item => {
            const areaElement = item.elements[6];
            if (areaElement && areaElement.elements && areaElement.elements[0] && areaElement.elements[0].text) {
              return areaElement.elements[0].text === selectedArea;
            }
            return false; // 'area' 요소 또는 'elements[0].text'가 없는 경우 필터링하지 않음
          });

          if (filteredData.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            const thumbnailArray = filteredData.map((item) => {
              return item.elements[7].elements[0].text;
            });

            setData(filteredData);
            setThumbnails(thumbnailArray);
          }

        } else if (selectedField != null) { // 분야도 선택하였을 경우
          console.log("Area,Field만 선택하였다.");
          const fetchedGenreData = await FetchGenreData({ code: fieldcode });

          console.log(selectedArea);
          const filteredData = fetchedGenreData.filter(item => {
            const areaElement = item.elements[6];
            if (areaElement && areaElement.elements && areaElement.elements[0] && areaElement.elements[0].text) {
              return areaElement.elements[0].text === selectedArea;
            }
            return false; // 'area' 요소 또는 'elements[0].text'가 없는 경우 필터링하지 않음
          });

          if (filteredData.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            const thumbnailArray = filteredData.map((item) => {
              return item.elements[7].elements[0].text;
            });

            setData(filteredData);
            setThumbnails(thumbnailArray);
          }
        }
        else if(searchTerm!=null){ //검색으로 하였을경우
          const dataA = await FetchGenreData({ code: "A000" });
          const dataB = await FetchGenreData({ code: "B000" });
          const dataC = await FetchGenreData({ code: "C000" });
          const dataD = await FetchGenreData({ code: "D000" });
          const dataL = await FetchGenreData({ code: "L000" });

          // 데이터 합치기
          const fetchedData = [...dataA, ...dataB, ...dataC, ...dataD, ...dataL];
          
          const filteredData = fetchedData.filter(item => {
            const itemText = item.elements[1].elements[0].text;
            return itemText && itemText.length >= 2 && itemText.includes(searchTerm);
          });
          
          
          if(filteredData.length===0){
            setNoData(true);
          }
          else{
            setNoData(false);
            const thumbnailArray = filteredData.map((item) => {
              return item.elements[7].elements[0].text;
            });

            setData(filteredData);
            setThumbnails(thumbnailArray);
            
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [selectedArea, selectedField,searchTerm]);

  // 전체 페이지 수 계산
  const totalPageCount = Math.ceil(data.length / itemsPerPage);
  // 현재 페이지 그룹 계산
  const currentPageGroup = Math.ceil(currentPage / pagesPerGroup);
  // 현재 페이지 그룹의 시작 페이지와 끝 페이지 계산
  const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentPageGroup * pagesPerGroup, totalPageCount);
  // 페이지 버튼 렌더링
  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div className='container'>
      <p style={{fontSize:"30",fontWeight:"bold"}}>검색어 : {searchTerm} {selectedArea} {selectedField} {selectedDate}</p>
      
      {currentPageData.map((item, index) => (
        <div key={index} className="grid-item">
          <Link to={`/detail/${index}`} style={{ textDecoration: "none" }}>
            <div className='image_container'>
              <img src={thumbnails[startIndex + index]} alt={`Image ${startIndex + index}`} />
            </div>
            <p style={{ color: 'black' }}>{item.elements[1].elements[0].text}</p>
          </Link>
        </div>
      ))}

      {/* 페이지네이션*/}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전 페이지
        </button>
        {renderPageButtons()}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPageCount}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default SearchedData;
