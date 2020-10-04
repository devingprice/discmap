import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const GreenSwitch = withStyles({
    switchBase: {
      color: green[300],
      '&$checked': {
        color: green[500],
      },
      '&$checked + $track': {
        backgroundColor: green[500],
      },
    },
    checked: {},
    track: {},
})(Switch);

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
        },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

export default function CustomizedSwitches() {
    const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
      checkedC: true,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  
    return (
        <FormGroup>
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Round</Grid>
                <Grid item>
                    <GreenSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />
                </Grid>
                <Grid item>Player</Grid>
                </Grid>
            </Typography>
        
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Round</Grid>
                <Grid item>
                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                </Grid>
                <Grid item>Player</Grid>
                </Grid>
            </Typography>
        </FormGroup>
    );
  }