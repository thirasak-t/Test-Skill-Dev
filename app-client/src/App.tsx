import React from "react";
import { Toaster, ToastBar } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import Theme from "./theme";
import Profile from "./pages/profile";
import { AuthProvider } from "./components/AuthProvider";

function App() {
    const theme = responsiveFontSizes(createTheme(Theme()));
    return (
        <ThemeProvider theme={theme}>
            <Toaster>
                {(_to) => (
                    <ToastBar
                        toast={{
                            ..._to,
                            message: _to.message as string,
                        }}
                    />
                )}
            </Toaster>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <Routes>
                        <Route path="/Register" element={<Register />} />
                    </Routes>
                    <Routes>
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
