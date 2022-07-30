import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MapView from "./components/MapView";
import Auth from "./components/Auth";
import Posts from "./components/Posts";
import UserPosts from "./components/UserPosts"
import PostDetail from "./components/PostDetail"
import AddPost from "./components/AddPost"
import {useSelector} from "react-redux";
import {createTheme, colors, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: colors.pink[100],
            main: colors.pink[300],
            dark: colors.pink[500]
        },
        secondary: {
            light: colors.pink[100],
            main: colors.pink[300],
            dark: colors.pink[500]
        }
    }
})

function App() {
    const isLoggedIn = useSelector(state=> state.isLoggedIn);
    console.log(isLoggedIn)
    return (
        <ThemeProvider theme={theme}>
        <React.Fragment>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                        <>
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/posts/add" element={<AddPost />} />
                            <Route path="/myPosts" element={<UserPosts />} />
                            <Route path="/myPosts/:id" element={<PostDetail />} />
                            <Route path="/ViewMap" element={<MapView />} />
                        </>
                    )}
                </Routes>
            </main>
        </React.Fragment>
        </ThemeProvider>
    );
}

export default App;