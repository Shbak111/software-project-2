import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getNickname } from "../LoginComponent/user";
import "./Mypage.css";
import comment_views from "../../assets/comment_views.png";
import post_views from "../../assets/post_views.png";
function Mypage() {
  const nickname = getNickname();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/user/posts', {
          nickname: nickname
        });
        console.log(response.data);

        if (response.data) {
          setData(response.data);
        } else {
          console.error('Response data is empty or not in the expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [nickname]);

  const logout = () => {
    axios({
      url: "/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        localStorage.removeItem("token");
        window.open("/Login", "_self");
      }
    });
  };

  return (
      <div className="mypage_container">
      <p className="mypage_title">MY PAGE</p>
      <div>
        <div className="content_mypage">
          <div className="content__container">
            <p className="content__container__text">
              Hello
            </p>
            
            <ul className="content__container__list">
              <li className="content__container__list__item">korea !</li>
              <li className="content__container__list__item">{nickname}!</li>
              <li className="content__container__list__item">users !</li>
              <li className="content__container__list__item">everybody !</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mypage_community">커뮤니티 이용 기록</p>
      <div className="space_mypage">  </div>
      <div className="user_mypage_row">
        {data.map((item, index) => (
        <div key={index} className="user_community_posts">
            <Link
                to={`/PostDetail/${item._id}`}
                className="link"
            >
            <p className="user_community_posts_title">{item.title}</p>
            <p className="user_community_posts_content">{item.content}</p>
            <div className="user_views_row"> 
            <img className="mypage_icon" src={comment_views} alt="Loading.."/><p className="user_community_posts_views">{item.views}</p>
            </div>
            <div className="user_views_row">
            <img className="mypage_icon" src={post_views} alt="Loading.."/><p className="user_community_posts_commentsviews">{item.comments.length}</p>
            </div>
            </Link>
        </div>
        ))}
    </div>
    <div className="btn_mypage"><button className="logout_mypage" onClick={logout}>LOGOUT</button></div>
    
  </div>    
  );
}

export default Mypage;
