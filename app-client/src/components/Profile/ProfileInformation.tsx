import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import Base64Image from "../Base64Image";
import User from "../../models/UserModel";

interface ProfileInformationProps {
    user: User;
    setEditIsOn: () => void;
    turnOnChangePassword: () => void;
}

function ProfileInformation({ user, setEditIsOn, turnOnChangePassword }: ProfileInformationProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "350px",
                width: matches ? "25vw" : "600px",
                padding: matches ? "20px 10px" : "20px 20px",
                gap: "1.2rem",
                borderRadius: "1rem",
                backgroundColor: "rgba(255, 255, 255, .15)",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", margin: 1 }}>
                <Base64Image height="200px" width="200px" img={user.profileImage} />
            </Box>
            <Typography variant="h4">
                {user.firstname} {user.lastname}
            </Typography>

            <Typography variant="h6">Username: {user.username}</Typography>

            <Button variant="contained" onClick={setEditIsOn}>
                edit profile
            </Button>

            <Button variant="contained" onClick={turnOnChangePassword}>
                change password
            </Button>
        </div>
    );
}
export default ProfileInformation;
