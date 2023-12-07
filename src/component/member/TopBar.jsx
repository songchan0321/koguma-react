import { Brightness3 } from "@mui/icons-material";
import { styled } from "@mui/system";

const CustomBrightness3Icon = styled(Brightness3)`
  color: #5F00FF;
`;

const TopBar = () => {
    return (
        <CustomBrightness3Icon
            variant="h6"
            color="secondary"
            component="h2"
            sx={{ textAlign: "center", mb: 1.5 }}
        />
    );
};

export default TopBar;