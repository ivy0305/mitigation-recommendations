import './styles.css'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Typography from '@mui/material/Typography';

function InfoCard(props) {
  const mitigationsLength = props.mitigations.length;

  const displayCamelCase = (text) => {
    var newText = text;
    if (text.match('_')) {
        newText = text.replace(/_/g, ' /');
    }
    const result = newText.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  } 

  const theme = createTheme({
    palette: {
      high: {
        main: '#f44336',
        contrastText: '#fff'
      },
      medium: {
        main: '#ff9800',
        contrastText: '#000'
      },
      low: {
        main: '#ffeb3b',
        contrastText: '#000'
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Card className="card">
        <Chip label={'Priority: ' + displayCamelCase(props.priority)} color={props.priority} className='priorityLabel' sx={{borderRadius:'10px'}}/>
        <Grid container>
          <Grid item xs>
            <p><b>Vulnerability: </b>{props.vulnerability}</p>
            <div>
              <b>App Features:<br /></b>
              <Stack direction="row" spacing={1} sx={{justifyContent: 'center'}}>
              {props.features.map((feature) => (
                    <Chip key={feature} label={displayCamelCase(feature)} size="small" />
                    // <FormControlLabel key={feature} disabled checked control={<Checkbox size="small"/>} value={feature} label={<Typography sx={{ typography: 'subtitle2', textTransform: 'capitalize', letterSpacing: 1 }}>{displayCamelCase(feature)}</Typography>}/>
                  ))}
              </Stack>
            </div>
            <p><b>Priority:</b> <span style={{textTransform:'capitalize'}}>{props.priority}</span></p>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            {mitigationsLength===1 ? <b>Mitigation:</b> : <b>Mitigations:</b>}
            {props.mitigations.map((mitigation) =>
              <div key={mitigation}>
                <p>{mitigation}</p>
                {mitigation!==props.mitigations[mitigationsLength-1] ? <Divider variant="middle"></Divider> : ''}
              </div>
            )}
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
}

export default InfoCard;
