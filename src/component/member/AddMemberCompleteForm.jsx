// AddMemberComplete.jsx

import React from "react";
import {Box, Button} from "@mui/material";

const AddMemberCompleteForm = ({ navigate }) => {
    const handleNavigate = (url) => {
        navigate(url);
    };
    return (
        <Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleNavigate("/common/login")}
                style={{ marginLeft: 10, marginTop: 200 }}
            >
                로그인
            </Button>
        </Box>
    );
};

export default AddMemberCompleteForm;
