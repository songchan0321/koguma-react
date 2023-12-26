import { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Card, CardContent, MobileStepper } from "@mui/material";
import { Link } from "react-router-dom";
import { allClubAPI, categoryListAPI } from "../../apis/api/club";

const ClubListStepper = ({ clubId, clubMember }) => {
  const [clubList, setClubList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await categoryListAPI();
        setCategoryList(categories);

        const clubs = await allClubAPI();
        setClubList(clubs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getClubsForCurrentCategory = () => {
    const currentCategory = categoryList[activeCategoryIndex];
    if (!currentCategory || !clubList) {
      return [];
    }

    const startIndex = currentCategory.startIndex;
    const endIndex = currentCategory.endIndex;
    if (startIndex !== undefined) {
      return clubList.slice(startIndex, endIndex + 1);
    } else {
      return [];
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (
      activeCategoryIndex < categoryList.length - 1 &&
      activeStep === categoryList[activeCategoryIndex].endIndex
    ) {
      setActiveCategoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));

    if (
      activeCategoryIndex > 0 &&
      activeStep === categoryList[activeCategoryIndex].startIndex
    ) {
      setActiveCategoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <div>
        {getClubsForCurrentCategory().map((club, index) => (
          <div key={index}>
            <Link
              to={{
                pathname: `/club/meet-up/${club.id}`,
                state: { clubId: clubId },
              }}
            >
              <Card style={{ marginBottom: 10 }}>
                <CardContent>
                  <div>{club.title}</div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      <div>
        {/* MobileStepper for navigation */}
        <MobileStepper
          variant="dots"
          steps={categoryList.length}
          position="static"
          activeStep={activeCategoryIndex}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === (categoryList?.length ?? 0) - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    </>
  );
};

export default ClubListStepper;
