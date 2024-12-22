import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Typography, TextField, Button, Paper } from "@mui/material";
import Header from "../components/headerMovieList";
import { Link } from "react-router-dom";

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <Header title="Sign up"/>
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 1,
        }}
        >
        <Typography>You must register a username and password to log in</Typography>
        <TextField variant="outlined" value={userName} placeholder="user name" onChange={e => {
            setUserName(e.target.value);
        }}></TextField><br />
        <TextField variant="outlined" value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
        }}></TextField><br />
        <TextField variant="outlined" value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value);
        }}></TextField><br />
        <Button onClick={register} variant="contained">Register</Button>
    </Paper>
    </>
  );
};

export default SignUpPage;
