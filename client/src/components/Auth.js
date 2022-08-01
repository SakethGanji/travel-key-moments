import React, {useState} from "react"
import {AppBar, Box, Button, Tab, Tabs, TextField, Toolbar, Typography} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
    })
    const [isSignup,setIsSignUp] = useState(false)

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async (type = "login") => {
        const res = await axios
            .post(`http://localhost:3000/${type}`, {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        console.log(data);
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (isSignup) {
            sendRequest("signup")
                .then((data) => localStorage.setItem("userId", data.id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/posts"));
        } else {
            sendRequest()
                .then((data) => localStorage.setItem("userId", data.id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/posts"));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                     display="flex"
                     flexDirection="column"
                     alignItems="center"
                     justify="center"
                     minHeight="100vh"
                     marginTop={25}
                     >
                    <Typography color="primary" variant="h4" m={1}> {isSignup ? "Sign Up" : "Log In"} </Typography>

                    { isSignup &&
                        <TextField name="name" onChange={handleChange} value={inputs.name} id="outlined-basic" label="Name" variant="outlined" margin="normal"/>}
                    <TextField name="email" onChange={handleChange} value={inputs.email} type="email" id="outlined-basic" label="Email" variant="outlined" margin="normal" />
                    <TextField name="password" onChange={handleChange} value={inputs.password} type="password" id="outlined-basic" label="Password" variant="outlined" margin="normal"/>

                    <Box display="flex"
                         flexDirection="row">
                        <Button onClick={(()=>setIsSignUp(!isSignup))} variant ='string' > {isSignup ? "Login" : "Signup"} </Button>
                        <Button type="submit" variant="outlined" sx={{margin:1, marginLeft:9}}>Submit</Button>
                    </Box>
                </Box>
            </form>
        </div>
    )
}

export default Auth
