import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import "./CommunityPost.css";

function CommunityPostUpdate() {
  const { index } = useParams();
  const [post, setPost] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function fetchPostData() {
      try {
        const response = await axios.get(`/community/postByIndex/${index}`);
        setPost(response.data);
        setNewTitle(response.data.title);
        setNewContent(response.data.content);
      } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
      }
    }

    fetchPostData();
  }, [index]);

  const TitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const ContentChange = (event) => {
    setNewContent(event.target.value);
  };

  const UpdateClick = async () => {
    try {
      await axios.put(`/community/updatePost/${index}`, {
        title: newTitle,
        content: newContent,
      });

      alert('게시글이 수정되었습니다.');
      history.push(`/community/post/${index}`); 
    } catch (error) {
      console.error('게시글 업데이트 중 오류 발생:', error);
    }
  };

  return (
    <div className='post_container'>
      <p>게시글 수정 화면</p>
      <p>제목</p>
      <input
        type="text"
        value={newTitle}
        onChange={TitleChange}
        className='post_title'
      ></input>
      <p>내용</p>
      <input
        type="text"
        value={newContent}
        onChange={ContentChange}
        className='post_content'
      ></input>

      <button onClick={UpdateClick}>완료</button>
    </div>
  );
}

export default CommunityPostUpdate;
