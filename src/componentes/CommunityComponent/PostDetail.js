import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { index } = useParams(); 
  const [post, setPost] = useState({}); 
  useEffect(() => {
    async function fetchPostData() {
      try {
        const response = await axios.get(`/community/postByIndex/${index}`);
        setPost(response.data);
      } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
      }
    }

    fetchPostData();
  }, [index]);

  return (
    <div>
      <p>게시글 상세 화면</p>
      <p>제목: {post.title}</p>
      <p>내용: {post.content}</p>
      <p>작성자: {post.writer}</p>
      
    </div>
  );
}

export default PostDetail;
