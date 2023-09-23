
import React, { useState, useEffect } from "react";
import {useHistory,Link} from "react-router-dom";
import "./CommunityZone.css"
import axios from "axios";
function CommunityZone(){
    const history=useHistory();
    const [titles,setTitles]=useState([]);
    const handlePostClick=()=>{
        history.push("/CommunityPost");
    }
    
    useEffect(() => {
        async function FetchCommunity() {
          const response = await axios({
            url: "/community/read",
            method: "GET",
          });
          console.log(response.data);
          console.log(titles._id);
          
          const titleArray=response.data.map(item=>item.title);
          setTitles(titleArray);
        }
        FetchCommunity();
    }, []);
    
    return(
        <div className="PostFrame">
            <div style={{display:"flex",fontWeight:"bold"}}>
                <p style={{marginLeft:"1%"}}>No.</p>
                <p style={{marginLeft:"10%"}}>제목</p>
                <p style={{marginLeft:"65%"}}>닉네임</p>
                <p style={{marginLeft:"8%"}}>조회수</p>
            </div>
            <hr className="line"></hr>
            <div className="post">
                {titles.map((title, index) => (
                    <div className="postitem" key={index} >
                        <Link to={`/PostDetail/${index}`} style={{ display: "flex", alignItems: "center" }}>
                            <p className="post_index" style={{marginLeft:"1%"}}>{index + 1}</p>
                            
                            <p className="post_title" style={{marginLeft:"12%"}}>{title}</p>
                            
                            <p className="post_nickname" style={{marginLeft:"17%"}}>nickname</p>
                            <p className="post_views" style={{marginLeft:"7%"}}>0</p>
                            <hr className="post_line"/>
                        </Link>
                        
                        
                    </div>
                ))}
            </div> 
                
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