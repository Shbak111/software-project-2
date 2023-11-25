import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./PostDetail.css";
import { getNickname } from "../LoginComponent/user";

function PostDetail() {
  const history = useHistory();
  const { index } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const nickname = getNickname();

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
    if (post.writer == nickname) {
      history.push(`/CommunityPostUpdate/${index}`);
    } else {
      alert("작성자만 수정 가능합니다.");
    }
  };

  /** 여기 코멘트 추가하는 버튼 부분 */
  const commentBtnClick = () => {
    axios({
      url: "/community/postComment",
      method: "POST",
      data: {
        index: index,
        writer: nickname,
        comment: comment,
        model: "Board",
      },
    }).then(() => {
      window.location.reload();
    });
  };
  const onEditCommentChange = (event) => {
    setEditComment(event.target.value);
  };

  //댓글삭제//
  const deleteComment = (comment_index) => {
    axios
      .post("/api/deleteComment", {
        index: index, // 게시물 인덱스
        comment_index: comment_index, // 삭제할 댓글 인덱스
        model: "Board",
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
        index: index,
        comment_index: comment_index,
        editedComment: editComment,
        model: "Board",
      })
      .then((response) => {
        console.log(response.data.message);
        setEditComment("");
        window.location.reload();
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

  /** 삭제하는 버튼 부분 */
  const removeBtnClick = async () => {
    try {
      if (nickname == post.writer) {
        const isConfirmed = window.confirm("게시물을 삭제하시겠습니까?");
        if (isConfirmed) {
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
        } else {
          return;
        }
      } else {
        alert("작성자만 삭제가능합니다.");
      }
    } catch (error) {
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
      <div
        className="postdetail_header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="pst_title"> {post.title}</p>
        <p className="pst_timestamp">{formatTimestamp(post.timestamp)}</p>
      </div>
      <hr className="postdetail_hr" />
      <p className="pst_writer">작성자: {post.writer}</p>
      <p className="pst_content"> {post.content}</p>
      <p className="pst_views">조회수: {post.views}</p>
      <div className="postdetail_buttons" style={{display:"flex",justifyContent:"flex-end"}}>
        <button onClick={postedit}>게시글 수정</button>
        <button onClick={removeBtnClick}>게시글 삭제</button>
      </div>

      <hr style={{ width: "100%" }} />
      <div style={{ display: "flex", justifyContent: "space-between"}}>
        <textarea
          id="comment"
          className="post_comments"
          placeholder="댓글을 입력하세요"
          onChange={onCommentChange}
          style={{width:"87%"}}
        />
        <button className="comment_button" onClick={commentBtnClick}>
          등록
        </button>
      </div>

      {post.comments && post.comments.length > 0 ? (
        <div>
          {post.comments.map((comment, index) => (
            <div className="comment_container" key={index}>
              <div className="comment_header">
                <p className="cmt_writer">{comment.writer}</p>
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

export default PostDetail;
