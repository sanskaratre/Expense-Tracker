import React, { useState,useRef, useContext } from 'react';


import classes from './MainForm.module.css';
import MainContext from './MainContext';

const MainForm = () => {

  const emailInputRef=useRef();
  const passwordInputRef=useRef();  
  const confpasswordInputRef=useRef();  
  

  const mainCtx = useContext(MainContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] =useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

const submitHandler=(event)=>{
  event.preventDefault();
  const enteredEmail=emailInputRef.current.value;
  const eneterdPssword=passwordInputRef.current.value;
  const enteredconfPassword= confpasswordInputRef.current.value;
  
  let url;
  setIsLoading(true);
  if(isLogin){
    url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBt-TTIasB3F1iE43YRZw3AnZ2cfPHSJHI'
    }

  else{
    url= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBt-TTIasB3F1iE43YRZw3AnZ2cfPHSJHI"
    }
  fetch(url,
  {
    method:'POST',
    body: JSON.stringify({
      email:enteredEmail,
      password:eneterdPssword,
      confpassword:enteredconfPassword,
      returnSecureToken:true
     }),
     headers: {
       'Content-Type' :'application/json'
     }

  }
  ).then((res)=>{
    setIsLoading(false);
    if(res.ok){
       return res.json();
    }
    else{
       return res.json().then((data)=>{
        let errorMessage='Authentication failed';
    
       throw new Error(errorMessage);
    });
  }
  }).then(data => {
  mainCtx.login(data.idToken);
  
  })
  .catch((err) =>{
    alert(err.message);
  });


};



  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='confpassword'>Confirm Password</label>
          <input type='confpassword' id='confpassword' required ref={confpasswordInputRef} />
        </div>
        <div className={classes.actions}>
         { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading && <p>Loading..</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default MainForm;