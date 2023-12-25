import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProductTopBar from "../../component/product/ProductTopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import { useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../../component/common/BottomBar";
import ProductSearchList from "../product/ProductSearchList";
import MemberSearchList from "../member/MemberSearchList";
import { Paper } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SearchTab = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const navigate = useNavigate();
  const query = state ? state.query : "defaultQuery";
  const [value, setValue] = React.useState(0);
  console.log(state);

  const [location, setLocation] = React.useState();

  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const handleCategoryClick = (category, index) => {
    navigate("/product/list/category", {
      state: {
        category: category,
        categoryIndex: index,
      },
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const indicatorColorStyle = {
    indicatorColor: "rgb(255, 0, 0)", // 빨간색을 나타냄
  };
  React.useEffect(() => {
    // location이 변경될 때 수행할 동작
    console.log("Location changed in ProductSearchList:", location);
  }, [location]);

  return (
    <>
      <ProductTopBar
        location={location}
        setLocation={setLocation}
        handleCategory={handleCategoryClick}
      />
      {/* <Margin */}

      <Box sx={{ bgcolor: "background.paper" }}>
        <Paper
          sx={{
            position: "fixed",
            top: "3.55rem",
            left: 0,
            right: 0,
            zIndex: 1100,
          }}
          elevation={3}
        >
          <AppBar position="static" sx={{ backgroundColor: "#D070FB" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{ style: { background: "#ffffff" } }}
              textColor="inherit"
              variant="fullWidth"
              style={indicatorColorStyle}
              aria-label="full width tabs example"
            >
              <Tab label="중고거래" {...a11yProps(0)} />
              <Tab label="동네생활" {...a11yProps(1)} />
              <Tab label="모임" {...a11yProps(2)} />
              <Tab label="이웃" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
        </Paper>
        <SwipeableViews
          key={location}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <>
              <ProductSearchList query={query} />
            </>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <>
              <MemberSearchList query={query} />
            </>
          </TabPanel>
        </SwipeableViews>
        <BottomBar />
      </Box>
    </>
  );
};

export default SearchTab;
