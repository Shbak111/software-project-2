import axios from "axios";
import "./CommunityPost.css";
import { useState } from "react";

function CommunityPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const ClickPost = async () => {
    console.log(title);
    console.log(content);
    await axios({
      url: "/community/create",
      method: "POST",
      data: {
        writer: "nickname",
        title: title,
        content: content,
      },
    });
    window.history.back();
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const onContentChange = (event) => {
    setContent(event.target.value);
    console.log(content);
  };

  const ClickCancel = () => {
    const isConfirmed = window.confirm("정말로 취소하시겠습니까?");
    if (isConfirmed) {
      window.history.back(); // 이전 페이지로 이동
    } else {
      return;
    }
  };
  return (
    <div className="post_container">
      <p>글쓰기페이지</p>
      <input
        id="title"
        className="post_title"
        placeholder="제목을 입력하세요"
        style={{ marginBottom: "20px" }}
        onChange={onTitleChange}
      ></input>
      <input
        id="contents"
        onChange={onContentChange}
        className="post_content"
        placeholder="내용을 입력하세요"
      ></input>
      <div className="post_button">
        <button onClick={ClickPost}>등록</button>
        <button onClick={ClickCancel}>취소</button>
      </div>
    </div>
  );
}
export default CommunityPost;
