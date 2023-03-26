import './App.css';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

// Custom components
import InfoCard from './components/InfoCard';
import CustomCheckbox from './components/Checkbox';

import data from './data.json'

function App() {
  const [isChecked, setIsChecked] = useState({
    login: false,
    passwordRecovery: false,
    userProfiles: false,
    search: false,
    textInput: false,
    permissionRequests: false,
    dataCollection: false,
    locationServices: false,
    networkAccess: false,
    cameraAccess: false,
    pushNotifications: false,
    chat_Messaging: false,
    paymentOptions: false,
    calendarIntegration: false,
    analyticsAndTracking: false,
    // mediaPlayback: false,
    // accessToContacts: false,
  })

  const handleCheckboxChange = (event, name) => {
    const { checked } = event.target;
    setIsChecked((prevState) => ({ ...prevState, [name]: checked }));
  };

  const [selectedCards, setSelectedCards] = useState([]);
  const [noFeaturesChecked, setNoFeaturesChecked] = useState(true);

  const handleButtonClick = () => {
    console.log(data);
    console.log(isChecked);
    const filteredCards = data.filter((card) =>
      card.features.some((feature) => isChecked[feature])
    ).sort((a, b) => {
      if (a.priority === 'high') {
        return -1;
      } else if (b.priority === 'high') {
        return 1;
      } else if (a.priority === 'medium') {
        return -1;
      } else if (b.priority === 'medium') {
        return 1;
      } else {
        return 0;
      }
    });

    if (filteredCards.length !== 0) {
      setNoFeaturesChecked(false);
    } else {
      setNoFeaturesChecked(true);
    }
    console.log(filteredCards);
    setSelectedCards(filteredCards);
  };

  const featuresList = Object.keys(isChecked);
  const chunkSize = Math.ceil(featuresList.length / 3);
  const firstChunk = featuresList.slice(0, chunkSize);
  const secondChunk = featuresList.slice(chunkSize, chunkSize * 2);
  const thirdChunk = featuresList.slice(chunkSize * 2);

  return (
    <div className='App'>
        <h1>Mobile Application Security: Recommendations of Attack Mitigations</h1>

        <Card className='featureCard'>
          <h3>Select your app features:</h3>
          <Grid container>
            <Grid item xs style={{textAlign: 'left', paddingLeft:20}}>
              {firstChunk.map((feature) => (
                  <CustomCheckbox
                    key={feature}
                    name={feature}
                    isChecked={isChecked[feature]}
                    onChange={(e) => handleCheckboxChange(e, feature)}
                  />
                ))}
            </Grid>
            <Grid item xs style={{textAlign: 'left', paddingLeft:20}}>
              {secondChunk.map((feature) => (
                  <CustomCheckbox
                    key={feature}
                    name={feature}
                    isChecked={isChecked[feature]}
                    onChange={(e) => handleCheckboxChange(e, feature)}
                  />
                ))}
            </Grid>
            <Grid item xs style={{textAlign: 'left', paddingLeft:20}}>
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
          <Button variant="contained" className='findBtn' onClick={handleButtonClick} sx={{backgroundColor: '#BDCCCB', color: '#000'}}>Find</Button>
        </Card>

        <div className='infoCards'>
          <h3>Related Vulnerabilities:</h3>
          {noFeaturesChecked ? 
          <p>Select at least one feature to display results.</p> : 
          selectedCards.map((card, index) => (
            <InfoCard key={index} card={card} vulnerability={card.vulnerability} mitigations={card.mitigations} features={card.features} priority={card.priority}/>
          ))
          }
        </div>
    </div>
  );
}

export default App;
