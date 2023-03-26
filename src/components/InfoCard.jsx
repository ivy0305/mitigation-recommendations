import "./styles.css";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function InfoCard(props) {
  const vulnerabilitiesLength = props.card.vulnerabilities.length;

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
    },
  });

  const featureColor = (feature) => {
    if (props.isChecked[feature] === true) {
      return "selected";
    } else {
      return "default";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <CardContent>
          <Chip
            label={"Priority: " + displayCamelCase(props.card.priority)}
            color={props.card.priority}
            className="priorityLabel"
            sx={{ borderRadius: "10px" }}
          />
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            {props.card.mitigation}
          </Typography>
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
          {vulnerabilitiesLength === 1 ? (
            <p>
              <b>Vulnerability:</b>
            </p>
          ) : (
            <p>
              <b>Vulnerabilities:</b>
            </p>
          )}
          {props.card.vulnerabilities.map((vulnerability) => (
            <ul key={vulnerability}>
              <li>{vulnerability}</li>
            </ul>
          ))}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default InfoCard;
