import React from "react";
import {Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";

const Post = ({ title, description, imageURL, userName, isUser, id }) => {

    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/posts/${id}`);
    };
    const deleteRequest = async () => {
        const res = await axios
            .delete(`http://localhost:3000/post/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleDelete = () => {
        deleteRequest()
            .then(() => navigate("/"))
            .then(() => navigate("/auth"));
    };

    return (
        <div>
            {" "}
            <Card
                sx={{
                    width: "50%",
                    margin: "auto",
                    mt: 2,
                    padding: 2,
                    boxShadow: "5px 5px 10px #ccc",
                    ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                    },
                }}
            >
                {isUser && (
                    <Box display="flex">
                        <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                            <ModeEditOutlineIcon color="warning" />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteForeverIcon color="error" />
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    title={title}
                />
                <CardMedia
                    component="img"
                    image={imageURL}
                />

                <CardContent>
                    <hr />
                    <br />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Post;