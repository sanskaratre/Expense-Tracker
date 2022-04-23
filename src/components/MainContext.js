import React, { useState } from 'react'

 const MainContext =React.createContext({
  token:'',
  email:'',
  isLoggedIn: false,
  login:(token,email)=>{}, 
  logout:()=>{}
});

export const MainContextProvider=(props)=>{
 const previousToken = localStorage.getItem('token')
 const [token,setToken] = useState(previousToken)
 const [email, setEmail] = useState("");
 const userIsLoggedIn= !!token;

 const loginHandler =(token,email) =>{
     setToken(token);
     setEmail(email);
     localStorage.setItem('token', token);
     localStorage.setItem('Email', email);
 }
 const logoutHandler =()=>{
     setToken(null);
     setEmail(null);
     localStorage.removeItem('token');
     localStorage.removeItem('Email')
 }

const contextValue={
    token:token,
    email:email,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout: logoutHandler
}

    return (
    <MainContext.Provider value={contextValue}>
        {props.children}
    </MainContext.Provider>
    )
}
export default MainContext;