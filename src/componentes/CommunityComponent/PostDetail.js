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
    }).then(() => {
      // 댓글을 성공적으로 추가한 후 페이지를 다시 로드합니다.
      window.location.reload();
    });
  };

  const deleteComment = (comment_index) => {
    axios
      .post('/api/deleteComment', {
        index: index, // 게시물 인덱스
        comment_index: comment_index, // 삭제할 댓글 인덱스
      })
      .then(() => {
        window.location.reload();
        
      })
      .catch((error) => {
        console.error('댓글 삭제 중 오류 발생:', error);
        // 오류 처리, 예를 들어 오류 메시지를 표시합니다.
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  

  return (
    <div className="postdetail_container">
      <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
        <p className="pst_title">제목: {post.title}</p>
        <p className="pst_timestamp">{formatTimestamp(post.timestamp)}</p>  
      </div>
      <hr style={{width:"50%"}}/>
      <p className="pst_writer">작성자: {post.writer}</p>
      <p className="pst_content">내용: {post.content}</p>
      <p className="pst_views">조회수: {post.views}</p>
      <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={postedit}>게시글 수정</button>
        <button onClick={removeBtnClick}>게시글 삭제</button>
      </div>
      
      <hr style={{width:"50%"}}/>
      <div style={{display:'flex',justifyContent:"space-between"}}>
        <textarea
          id="comment"
          className="post_comments"
          placeholder="댓글을 입력하세요"
          onChange={onCommentChange}
        />
        <button onClick={commentBtnClick}>댓글추가</button>
      </div>
      
      {post.comments && post.comments.length > 0 ? (
        <div>
          {post.comments.map((comment, index) => (
            <div key={index}>
              <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
                <p className="cmt_writer">{comment.writer}</p>
                <p className="cmt_timestamp">{formatTimestamp(post.timestamp)}</p>
              </div>
              <p className="cmt_comment">{comment.comment}</p>
              <button onClick={() => deleteComment(comment.comment_index)}>삭제</button>
              <hr  />
            </div>
          ))}
        </div>
      ) : (
        <p>작성된 댓글이 없습니다.</p>
      )}
      
    </div>
  );
}

export default PostDetail;