import axios from 'axios';
import { useState,useEffect  } from "react";

function fetchUserNickname(token, setNickname) {
  axios.get("/login/success", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then((successResponse) => {
    setNickname(successResponse.data.nickname);
  })
  .catch((error) => {
    console.error("Error fetching user nickname:", error);
  });
}

export function UseNickname() {
  const token = localStorage.getItem("token");
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (token) {
      fetchUserNickname(token, setNickname);
    }
  }, [token]);

  return nickname;
}

export function getNickname() {
  return UseNickname();
}
