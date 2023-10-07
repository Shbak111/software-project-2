import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./CommunityZone.css";
import axios from "axios";
function CommunityZone() {
  const history = useHistory();
  const [titles, setTitles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = titles.slice(startIndex, endIndex);

  const handlePostClick = () => {
    history.push("/CommunityPost");
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
      }));
      console.log(response.data.map((item) => item._id));
      setTitles(titleArray);
      const totalPages = Math.ceil(titleArray.length / pageSize);
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

  return (
    <div className="PostFrame">
      <div style={{ display: "flex", fontWeight: "bold" }}>
        <p style={{ marginLeft: "1%" }}>No.</p>
        <p style={{ marginLeft: "10%" }}>제목</p>
        <p style={{ marginLeft: "65%" }}>닉네임</p>
        <p style={{ marginLeft: "8%" }}>조회수</p>
      </div>
      <hr className="line"></hr>
      <div className="post">
        {currentItems ? (
          currentItems.map((title, index) => (
            <div className="postitem" key={index}>
              <Link
                to={`/PostDetail/${title._id}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <p className="post_index" style={{ marginLeft: "1%" }}>
                  {startIndex + index + 1}
                </p>
                <p className="post_title" style={{ marginLeft: "12%" }}>
                  {title.title}
                </p>
                <p className="post_nickname" style={{ marginLeft: "17%" }}>
                  nickname
                </p>
                <p className="post_views" style={{ marginLeft: "7%" }}>
                  0
                </p>
                <hr className="post_line" />
              </Link>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>

      <hr className="line"></hr>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="postsearch">
          <input style={{ width: "50%", marginLeft: "1%" }}></input>
          <button>검색</button>
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
