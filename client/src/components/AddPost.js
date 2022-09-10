import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        longitude: "",
        latitude: "",
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const sendRequest = async () => {
        const res = await axios
            .post("http://localhost:3000/post/add", {
                title: inputs.title,
                content: inputs.content,
                user_id: 1,
                rating:0,
                longitude: inputs.longitude,
                latitude: inputs.latitude
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then((data) => console.log(data))
            .then(() => navigate("/posts"));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    border={3}
                    paddingLeft={10}
                    paddingRight={10}
                    marginLeft={55}
                    marginTop={10}
                    display="flex"
                    flexDirection={"column"}
                    width={"100%"}
                >
                    <Typography
                        fontWeight={"bold"}
                        padding={3}
                        variant="h5"
                        textAlign={"center"}
                    >
                        Post Your Blog
                    </Typography>

                        Title
                    <TextField
                        name="title"
                        onChange={handleChange}
                        value={inputs.title}
                        margin="auto"
                        variant="outlined"
                    />

                        Content
                    <TextField
                        name="content"
                        onChange={handleChange}
                        value={inputs.content}
                        margin="auto"
                        variant="outlined"
                    />

                        Longitude
                    <TextField
                        name="longitude"
                        onChange={handleChange}
                        value={inputs.longitude}
                        margin="auto"
                        variant="outlined"
                    />

                    Latitude
                    <TextField
                        name="latitude"
                        onChange={handleChange}
                        value={inputs.latitude}
                        margin="auto"
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"

                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddPost
