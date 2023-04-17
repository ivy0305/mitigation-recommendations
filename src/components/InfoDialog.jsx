import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";

function InfoDialog(props) {
  const vulnerabilitiesLength = props.vulnerabilities.length;
  const relatedMitigationsLength = props.details.relatedMitigations.length;
  const dotpointsLength = props.details.dotpoints.length;

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle>Mitigation technique: {props.mitigation}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs sx={{ padding: "0 20px" }}>
            <h4>
              (Normalised) degree centrality score:{" "}
              <span className="h4Body">{props.degree.toFixed(4)}</span>
            </h4>

            <h4>Technique details:</h4>
            <p>{props.details.summary}</p>
            {dotpointsLength !== 0 && (
              <ul>
                {props.details.dotpoints.map((point) => (
                  <li>{point}</li>
                ))}
              </ul>
            )}
            {relatedMitigationsLength !== 0 && (
              <>
                <h4>Related Mitigation Techniques:</h4>
                {props.details.relatedMitigations.map((technique) => (
                  <ul key={technique}>
                    <li>{technique}</li>
                  </ul>
                ))}
              </>
            )}
            <p>
              Learn more information at the MITRE ATT&CK website:&nbsp;
              <a href={props.details.link} target="_blank" rel="noreferrer">
                {props.mitigation}
              </a>
            </p>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs sx={{ padding: "0 20px" }}>
            {vulnerabilitiesLength === 1 ? (
              <h4>Related Vulnerability:</h4>
            ) : (
              <h4>Related Vulnerabilities:</h4>
            )}
            {props.vulnerabilities.map((vulnerability) => (
              <ul key={vulnerability}>
                <li>{vulnerability}</li>
              </ul>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="btn"
          className="mainBtn"
          onClick={props.handleClose}
        >
          <CloseIcon fontSize="small" sx={{ marginRight: 1 }} />
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoDialog;
