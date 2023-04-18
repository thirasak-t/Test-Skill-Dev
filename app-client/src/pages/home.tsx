import React from "react";
import NavBar from "../components/Home/NavBar";
import { Box } from "@mui/material";

function Home() {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "#fff",
                position: "absolute",
            }}
        >
            <NavBar />
        </Box>
    );
}

export default Home;
