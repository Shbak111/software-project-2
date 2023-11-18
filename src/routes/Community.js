import React from "react";
import "../css/Community.css";
import CommunityZone from "../componentes/CommunityComponent/CommunityZone";
import { useEffect } from "react";
import axios from "axios";
function Community() {
  useEffect(() => {
    async function FetchCommunity() {
      const response = await axios({
        url: "/community/read",
        method: "GET",
      });
      console.log(response.data);
    }
    FetchCommunity();
  }, []);
  return (
    <div className="Community_container">
      <p style={{fontSize:"44px",fontWeight:"bold"}}>여긴 커뮤니티!</p>
      <CommunityZone />
    </div>
  );
}
export default Community;
