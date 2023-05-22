import React from 'react';
import { useHistory } from 'react-router-dom';
import style from "./landing.module.css"
const Landing = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push('/home');
  };

  return (
    <div className={style.container}>
      
      <button className={style.button} onClick={goToHome}>Go to Home</button>
    </div>
  );
};

export default Landing;
