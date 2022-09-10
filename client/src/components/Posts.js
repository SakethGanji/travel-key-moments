import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

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
        sendRequest().then((data) => setPosts(data));
    }, []);
    console.log(posts)
    return (
        <div>
            {posts &&
                posts.map((post, index) => (
                    <Post
                        id={post.id}
                        isUser={localStorage.getItem("id") === post.id}
                        title={post.title}
                        description={post.post}
                        imageURL={'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='}
                        userName={post.username}
                    />
                ))}
        </div>
    );
};

export default Posts;