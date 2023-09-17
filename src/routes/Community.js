import React from "react";
import "../css/Community.css"
import CommunityZone from "../componentes/CommunityComponent/CommunityZone"
function Community(){
    return(
        <div className="Community_container">
            <p>여긴 커뮤니티</p>
            <CommunityZone />
        </div>
    )
}
export default Community;
