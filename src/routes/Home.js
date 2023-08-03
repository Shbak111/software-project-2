import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  let history = useHistory();

  const handleButtonClick1 = () => {
    history.push('/Map');
  };
  const handleButtonClick2 = () => {
    history.push('/Detail');
  };
  const handleButtonClick3 = () => {
    history.push('/Show');
  };
  const handleButtonClick4 = () => {
    history.push('/Restaurant_recommendation');
  };

  return (
      <div>
        <p>Home</p>
        <button onClick={handleButtonClick1}>지도이동</button>
        <button onClick={handleButtonClick2}>상세페이지이동</button>
        <button onClick={handleButtonClick3}>공연추천이동</button>
        <button onClick={handleButtonClick4}>관광지,먹거리이동</button>
      </div>
  );
};
export default Home;
