import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "../CommunityComponent/PostDetail.css";
import { getNickname } from "../LoginComponent/user";
import { FaStar } from 'react-icons/fa';
import "./DetailComment.css"
/** 각 디테일 전시, 공연에 댓글 기능하는 컴포넌트 */
function DetailComment({ seq }) {
  const history = useHistory();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [reload, setReload] = useState(true);
  const [rating, setRating] = useState(0); 
  const nickname = getNickname();

  useEffect(() => {
    async function fetchPostData() {
      try {
        const response = await axios.get(`/tour/readcomments/${seq}`);
        setPost(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    }
    fetchPostData();
  }, [seq, reload]);

  /** 여기 코멘트 추가하는 버튼 부분 */
  const commentBtnClick = () => {
    if(nickname==""){
      alert("로그인 후 리뷰작성이 가능합니다.")
    }
    else{
      axios({
        url: "/community/postComment",
        method: "POST",
        data: {
          index: seq,
          writer: nickname,
          comment: comment,
          model: "Comment",
          rating:rating,
        },
      }).then(() => {
        window.location.reload();
        console.log(rating)
      });

    }
    
  };
  const onEditCommentChange = (event) => {
    setEditComment(event.target.value);
  };
  const onRatingChange = (value) => {
    setRating(value);
  };

  //댓글삭제//
  const deleteComment = (comment_index) => {
    axios
      .post("/api/deleteComment", {
        index: seq, // 게시물 인덱스
        comment_index: comment_index, // 삭제할 댓글 인덱스
        model: "Comment",
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("댓글 삭제 중 오류 발생:", error);
        // 오류 처리, 예를 들어 오류 메시지를 표시합니다.
      });
  };
  //댓글삭제//

  //댓글 수정//
  const editCommentSubmit = (comment_index) => {
    axios
      .post("/api/editComment", {
        index: seq,
        comment_index: comment_index,
        editedComment: editComment,
        model: "Comment",
      })
      .then((response) => {
        console.log(response.data.message);
        setEditComment("");
        //window.location.reload();
        setReload(!reload);
      })
      .catch((error) => {
        console.error("댓글 수정 중 오류 발생:", error);
      });
  };
  const EditComment = (commentIndex) => {
    const updatedComments = post.comments.map((comment, index) => {
      if (index === commentIndex) {
        return { ...comment, isEditing: !comment.isEditing };
      }
      return comment;
    });
    setPost({ ...post, comments: updatedComments });
  };
  //댓글수정//

  const onCommentChange = (event) => {
    setComment(event.target.value);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <textarea
          id="comment"
          className="post_comments"
          placeholder="댓글을 입력하세요"
          onChange={onCommentChange}
        />
        {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          onClick={() => onRatingChange(value)}
          color={value <= rating ? '#ffc107' : '#e4e5e9'}
          size={25}
          style={{ margin: '5px', cursor: 'pointer' }}
        />
      ))}
        <button className="comment_button" onClick={commentBtnClick}>
          등록
        </button>
      </div>

      {post.comments && post.comments.length > 0 ? (
        <div>
          {post.comments.map((comment, index) => (
            <div className="comment_container" key={index}>
              <div className="comment_header">
                <p className="cmt_writer" style={{width:"30px"}}>{comment.writer}</p>
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    className="cmt_rating"
                    key={value}
                    color={value <= comment.rating ? '#ffc107' : '#e4e5e9'}
                    size={20}
                    style={{width:"20px"}}
                  />
                ))}
                <p className="cmt_timestamp">
                  {formatTimestamp(comment.timestamp)}
                </p>
                
              </div>
              {comment.isEditing ? (
                <div>
                  <textarea
                    className="edit_comment_input"
                    value={editComment}
                    onChange={onEditCommentChange}
                  />
                  <button
                    onClick={() => editCommentSubmit(comment.comment_index)}
                  >
                    등록
                  </button>
                </div>
              ) : (
                <div>
                  <p className="cmt_comment">{comment.comment}</p>
                  <button
                    className="edit_comment_button"
                    onClick={() => EditComment(index)}
                  >
                    수정
                  </button>
                  <button
                    className="delete_comment_button"
                    onClick={() => deleteComment(comment.comment_index)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>작성된 댓글이 없습니다.</p>
      )}
    </div>
  );
}

export default DetailComment;
