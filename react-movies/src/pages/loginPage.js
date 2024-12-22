import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import Header from "../components/headerMovieList";
import { Typography, TextField, Button, Paper } from "@mui/material";

const LoginPage = props => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <Header title="Login"/>
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
                    {/* <div> */}
            <Typography>You must log in to view the protected pages </Typography>
            <TextField variant="outlined" id="username" placeholder="user name" onChange={e => {
                setUserName(e.target.value);
            }} /><br />
            <TextField variant="outlined" id="password" type="password" placeholder="password" onChange={e => {
                setPassword(e.target.value);
            }} /><br />
            <Button variant="contained" onClick={login}>Log in</Button>
            <Typography>Not Registered?
                <Link to="/signup">Sign Up!</Link></Typography> 
            </Paper>
        </>
    );
};

export default LoginPage;
