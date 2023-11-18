import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./CommunityZone.css";
import axios from "axios";
import { getNickname } from "../LoginComponent/user";
function CommunityZone() {
  const history = useHistory();
  const [titles, setTitles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [originalTitles, setOriginalTitles] = useState([]);
  const nickname = getNickname();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = titles.slice(startIndex, endIndex);

  const handlePostClick = () => {
    if(nickname==""){
      alert("로그인 후 이용가능합니다.");
    }
    else{
      history.push("/CommunityPost");
    }
    
  };

  useEffect(() => {
    async function FetchCommunity() {
      const response = await axios({
        url: "/community/read",
        method: "GET",
      });
      console.log(response.data);

      const titleArray = response.data.map((item) => ({
        _id: item._id,
        title: item.title,
        views: item.views,
        writer: item.writer,
      }));
      const reversedTitleArray = titleArray.reverse();
      
      setTitles(reversedTitleArray);
      setOriginalTitles(reversedTitleArray);
      const totalPages = Math.ceil(reversedTitleArray.length / pageSize);
      setTotalPages(totalPages);
    }
    FetchCommunity();
  }, [pageSize]);

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
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

  const PostSearchButton = () => {
    if (searchInput.trim() === "") {
      setTitles(originalTitles);
    } else {
      const filteredTitles = titles.filter((title) =>
        title.title.includes(searchInput)
      );
      setTitles(filteredTitles);
    }
  };

  return (
    <div className="PostFrame">
      <div style={{ display: "flex", fontWeight: "bold" }}>
        <p style={{ fontSize:"22px", marginLeft: "1%" }}>No.</p>
        <p style={{ fontSize:"22px", marginLeft: "10%" }}>제목</p>
        <p style={{ fontSize:"22px", marginLeft: "63%" }}>닉네임</p>
        <p style={{ fontSize:"22px", marginLeft: "8%" }}>조회수</p>
      </div>
      <hr className="line"></hr>
      <div className="post">
        {currentItems ? (
          currentItems.map((title, index) => (
            <div className="postitem" key={index}>
              <Link
                to={`/PostDetail/${title._id}`}
                style={{ display: "flex", alignItems: "center",textDecoration: "none" ,color: "inherit"}}
              >
                <p className="post_index" style={{ width:"25px", fontSize:"18px",marginLeft: "1%" }}>
                  {startIndex + index + 1}
                </p>
                <p className="post_title" style={{ width:"650px", fontSize:"18px",marginLeft: "12%" }}>
                  {title.title}
                </p>
                <p className="post_nickname" style={{ fontSize:"18px",marginLeft: "13%", width:"60px" }}>
                  {title.writer}
                </p>
                <p className="post_views" style={{ fontSize:"18px",marginLeft: "10%" }}>
                  {title.views}
                </p>
                
              </Link>
            </div>
          ))
        ) : (
          <p>작성된 게시글이 없습니다</p>
        )}
      </div>

      <hr className="line"></hr>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="postsearch">
          <input onChange={(e) => setSearchInput(e.target.value)} style={{ width: "50%", marginLeft: "1%" }} ></input>
          <button onClick={PostSearchButton}>검색</button>
        </div>
        {/* 페이지네이션 */}
        <div
          className="pagination"
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: "3%",
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전 페이지
          </button>
          {renderPageButtons()}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음 페이지
          </button>
        </div>

        <div className="poston">
          <button onClick={handlePostClick}>글쓰기</button>
        </div>
      </div>
    </div>
  );
}
export default CommunityZone;
