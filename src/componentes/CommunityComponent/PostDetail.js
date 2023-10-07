import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./PostDetail.css";
function PostDetail() {
  const history = useHistory();
  const { index } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
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
  const postedit = () => {
    history.push(`/CommunityPostUpdate/${index}`);
  };

  /** 여기 코멘트 추가하는 버튼 부분 */
  const commentBtnClick = () => {
    axios({
      url: "/community/postComment",
      method: "POST",
      data: {
        index: index,
        writer: "nickname",
        comment: comment,
      },
    });
  };
  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  /** 삭제하는 버튼 부분 */
  const removeBtnClick = async () => {
    try {
      await axios({
        url: "/community/removeBoard",
        method: "POST",
        data: {
          index: index,
        },
      }).then(() => {
        console.log("delete success");
        history.replace(`/Community`);
      });
    } catch (error) {
      // 에러 처리
      console.error("글 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <p>게시글 상세 화면</p>
      <p>제목: {post.title}</p>
      <p>내용: {post.content}</p>
      <p>작성자: {post.writer}</p>
      <button onClick={postedit}>수정</button>
      <input
        id="comment"
        className="post_comments"
        placeholder="댓글을 입력하세요"
        onChange={onCommentChange}
      ></input>
      <button onClick={commentBtnClick}>댓글추가</button>
      {post.comments && post.comments.length > 0 ? (
        <ul>
          {post.comments.map((comment, index) => (
            <li key={index}>
              {/* 여기에서 각 댓글 객체의 내용을 출력하세요 */}
              작성자: {comment.writer}
              <br />
              내용: {comment.comment}
              <br />
              시간: {comment.timestamp}
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>작성된 댓글이 없습니다.</p>
      )}
      <button onClick={removeBtnClick}>삭제하기</button>
    </div>
  );
}

export default PostDetail;
