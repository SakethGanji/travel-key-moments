import React from "react"
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <AppBar sx={{background:"white"}}>
        <Toolbar>
            <Typography sx={{color:"palevioletred"}} variant="h4">
               TravelMap
            </Typography>
                <Box display="flex" marginLeft="auto">
                    <Button variant="outlined" sx={{margin:1, borderColor:"palevioletred", color: "palevioletred"}} >Login</Button>
                    <Button variant="contained" sx={{margin:1, background:"palevioletred"}} >Sign Up</Button>
                </Box>
        </Toolbar>
    </AppBar>
    )
}

export default Header;
