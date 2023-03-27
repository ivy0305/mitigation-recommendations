import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Custom components & styling
import VulnerabilityDialog from "./VulnerabilityDialog";
import "./styles.css";

function InfoCard(props) {
  const displayCamelCase = (text) => {
    var newText = text;
    if (text.match("_")) {
      newText = text.replace(/_/g, " /");
    }
    const result = newText.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const theme = createTheme({
    palette: {
      selected: {
        main: "#C8D6D6",
        contrastText: "#000",
      },
      high: {
        main: "#ED6A5A",
        contrastText: "#000",
      },
      medium: {
        main: "#FFA552",
        contrastText: "#000",
      },
      low: {
        main: "#FFF599",
        contrastText: "#000",
      },
      btn: {
        main: "#BDCCCB",
        contrastText: "#000",
      },
    },
  });

  const featureColor = (feature) => {
    if (props.isChecked[feature] === true) {
      return "selected";
    } else {
      return "default";
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardContent sx={{ marginBottom: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            {props.card.mitigation}
          </Typography>
          <Chip
            label={"Priority: " + displayCamelCase(props.card.priority)}
            color={props.card.priority}
            sx={{ borderRadius: "10px" }}
            size="small"
          />
          <p>
            <b>App Features:</b>
          </p>
          {props.card.features.map((feature) => (
            <Chip
              key={feature}
              label={displayCamelCase(feature)}
              size="small"
              sx={{ marginRight: "3px", marginBottom: "3px" }}
              color={featureColor(feature)}
            />
          ))}
        </CardContent>
        <CardActions className="actions">
          <Button
            variant="contained"
            color="btn"
            className="mainBtn"
            onClick={handleClickOpen}
          >
            <OpenInNewIcon fontSize="small" sx={{ marginRight: 1 }} />
            See vulnerabilities
          </Button>
          <VulnerabilityDialog
            mitigation={props.card.mitigation}
            vulnerabilities={props.card.vulnerabilities}
            open={open}
            handleClose={handleClose}
          />
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default InfoCard;
