import "./CommunityPost.css"
function CommunityPost(){
    const ClickPost=()=>{
        window.history.back();
    }
    const ClickCancel=()=>{
        const isConfirmed = window.confirm("정말로 취소하시겠습니까?");
        if (isConfirmed) {
            window.history.back(); // 이전 페이지로 이동
        }
        else{
            return;
        }

    }
    return(

        
        
        
        <div className="post_container">
            <p>글쓰기페이지</p>
            <input className="post_title" placeholder="제목을 입력하세요" style={{marginBottom:"20px"}}></input>
            <input className="post_content" placeholder="내용을 입력하세요"></input>
            <div className="post_button">
                <button onClick={ClickPost}>등록</button>
                <button onClick={ClickCancel}>취소</button>
            </div>
            
        </div>
        
    )
}
export default CommunityPost;