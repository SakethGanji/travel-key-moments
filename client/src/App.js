import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MapView from "./components/MapView";
import Auth from "./components/Auth";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts"
import PostDetail from "./components/PostDetail"
import AddPost from "./components/AddPost"

function App() {
    return (
        <React.Fragment>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                        <>
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/myPosts" element={<UserPosts />} />
                            <Route path="/myPosts/:id" element={<PostDetail />} />
                            <Route path="/posts/add" element={<AddPost />} />
                            <Route path="/ViewMap" element={<MapView />} />
                        </>
                    )}
                </Routes>
            </main>
        </React.Fragment>
    );
}

export default App;