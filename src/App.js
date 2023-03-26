import "./App.css";
import { useState } from "react";
import { Grid, Card, Button } from "@mui/material";

// Custom components
import InfoCard from "./components/InfoCard";
import CustomCheckbox from "./components/Checkbox";

import data from "./data.json";

function App() {
  const [isChecked, setIsChecked] = useState({
    login: false,
    passwordRecovery: false,
    // userProfiles: false,
    textInput: false,
    search: false,
    ads: false,
    permissions: false,
    dataCollection: false,
    fileStorage: false,
    locationServices: false,
    networkAccess: false,
    cameraAccess: false,
    notifications: false,
    paymentOptions: false,
    liveChat_Messaging: false,
    forumPosts_Comments: false,
    analyticsAndTracking: false,
    thirdPartyLibraries: false,
    openWithDialogue: false,
    audioCapturePermissions: false,
    phoneCallPermissions: false,
    all: false,
    // calendarIntegration: false,
    // mediaPlayback: false,
    // accessToContacts: false,
  });

  const handleCheckboxChange = (event, name) => {
    const { checked } = event.target;
    setIsChecked((prevState) => {
      if (name === "all") {
        const newState = {};
        Object.keys(prevState).forEach((key) => {
          newState[key] = checked;
        });
        return newState;
      } else {
        return { ...prevState, [name]: checked };
      }
    });
  };

  const [selectedCards, setSelectedCards] = useState([]);
  const [noFeaturesChecked, setNoFeaturesChecked] = useState(true);

  const filterCards = (cards, isChecked) => {
    const filteredCards = cards.filter((card) => {
      if (isChecked.all) {
        return true;
      } else {
        return card.features.some((feature) => isChecked[feature]);
      }
    });

    filteredCards.sort((a, b) => {
      const priorityOrder = { low: 2, medium: 1, high: 0 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      } else {
        const aNumChecked = a.features.filter(
          (feature) => isChecked[feature]
        ).length;
        const bNumChecked = b.features.filter(
          (feature) => isChecked[feature]
        ).length;
        return bNumChecked - aNumChecked;
      }
    });

    return filteredCards;
  };

  const handleButtonClick = () => {
    const checkedFeatures = Object.keys(isChecked).filter(
      (feature) => isChecked[feature] && feature !== "All"
    );
    if (checkedFeatures.length !== 0 || isChecked["all"]) {
      setNoFeaturesChecked(false);
      setSelectedCards([]);
    } else {
      setNoFeaturesChecked(true);
    }

    const filteredCards = filterCards(data, isChecked);
    setSelectedCards(filteredCards);
  };

  const featuresList = Object.keys(isChecked);
  const chunkSize = Math.ceil(featuresList.length / 3);
  const firstChunk = featuresList.slice(0, chunkSize);
  const secondChunk = featuresList.slice(chunkSize, chunkSize * 2);
  const thirdChunk = featuresList.slice(chunkSize * 2);

  return (
    <div className="App">
      <h1>
        Mobile Application Security: Recommendations of Attack Mitigations
      </h1>

      <Card className="featureCard">
        <h3>Select your app features:</h3>
        <Grid container>
          <Grid item xs style={{ textAlign: "left", paddingLeft: 20 }}>
            {firstChunk.map((feature) => (
              <CustomCheckbox
                key={feature}
                name={feature}
                isChecked={isChecked[feature]}
                onChange={(e) => handleCheckboxChange(e, feature)}
              />
            ))}
          </Grid>
          <Grid item xs style={{ textAlign: "left", paddingLeft: 20 }}>
            {secondChunk.map((feature) => (
              <CustomCheckbox
                key={feature}
                name={feature}
                isChecked={isChecked[feature]}
                onChange={(e) => handleCheckboxChange(e, feature)}
              />
            ))}
          </Grid>
          <Grid item xs style={{ textAlign: "left", paddingLeft: 20 }}>
            {thirdChunk.map((feature) => (
              <CustomCheckbox
                key={feature}
                name={feature}
                isChecked={isChecked[feature]}
                onChange={(e) => handleCheckboxChange(e, feature)}
              />
            ))}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          className="findBtn"
          onClick={handleButtonClick}
          sx={{ backgroundColor: "#BDCCCB", color: "#000" }}
        >
          Find
        </Button>
      </Card>

      <div className="infoCards">
        <h3>Related Mitigations:</h3>
        {noFeaturesChecked ? (
          <p>Select at least one feature to display results.</p>
        ) : (
          <Grid container spacing={2} alignItems="stretch">
            {selectedCards.map((card, index) => (
              <Grid item xs={4} sx={{ display: "flex" }}>
                <InfoCard key={index} card={card} isChecked={isChecked} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default App;
