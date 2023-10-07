import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory} from "react-router-dom";

function PostDetail() {
  const history=useHistory();
  const { index } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    async function fetchPostData() {
      try {
        const response = await axios.get(`/community/postByIndex/${index}`);
        setPost(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    }

    fetchPostData();
  }, [index]);
  const postedit=()=>{
    history.push(`/CommunityPostUpdate/${index}`);
  };

  /** 여기 코멘트 추가하는 버튼 부분 */
  const commentBtnClick = async () => {
    await axios({
      url: "/community/postComment",
      method: "POST",
      data: {
        index: index,
        writer: "nickname",
        comment: "contents",
      },
    });
  };

  /** 삭제하는 버튼 부분 */
  const removeBtnClick = async () => {
    await axios({
      url: "/community/removeBoard",
      method: "POST",
      data: {
        index: index,
      },
    }).then(() => {
      window.history.back();
    });
  };

  return (
    <div>
      <p>게시글 상세 화면</p>
      <p>제목: {post.title}</p>
      <p>내용: {post.content}</p>
      <p>작성자: {post.writer}</p>
      <button onClick={postedit}>수정</button>
      <button onClick={commentBtnClick}>댓글추가</button>
      <button onClick={removeBtnClick}>삭제하기</button>
    </div>
  );
}

export default PostDetail;
