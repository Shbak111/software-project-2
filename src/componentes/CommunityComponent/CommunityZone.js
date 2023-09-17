
import React, { useState, useEffect } from "react";
import {useHistory } from "react-router-dom";
import "./CommunityZone.css"
function CommunityZone(){
    const history=useHistory();
    const handlePostClick=()=>{
        history.push("/CommunityPost");
    }
    return(
        <div className="PostFrame">
            <div style={{display:"flex",fontWeight:"bold"}}>
                <p style={{marginLeft:"1%"}}>No.</p>
                <p style={{marginLeft:"10%"}}>제목</p>
                <p style={{marginLeft:"65%"}}>닉네임</p>
                <p style={{marginLeft:"8%"}}>조회수</p>
            </div>
            <hr className="line"></hr>
            <div className="post"></div>
                <p className="postitem" style={{marginLeft:"1%"}}>1.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>2.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>3.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>4.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>5.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>6.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>7.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>8.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>9.</p>
                <p className="postitem" style={{marginLeft:"1%"}}>10.</p>
            <hr className="line"></hr>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div className="postsearch">
                    <input style={{width:"50%",marginLeft:"1%"}}></input>
                    <button>검색</button>
                </div>
                <div className="poston">
                    <button onClick={handlePostClick}>글쓰기</button>
                </div>

            </div>
            
        </div>
    )
}
export default CommunityZone;