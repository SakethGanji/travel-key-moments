import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
    const [posts, setPosts] = useState();
    const sendRequest = async () => {
        const res = await axios
            .get("http://localhost:3000/post")
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        sendRequest().then((data) => setPosts(data.posts));
    }, []);
    console.log(posts);
    return (
        <div>

        </div>
    );
};

export default Posts;