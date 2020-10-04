import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import SettingsDropdown from './SettingsDropdown';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    settingsDropdown: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
export default function ElevateAppBar(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll className={classes.root}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>Disc Map</Typography>
                        <SettingsDropdown className={classes.settingsDropdown}>
                            {props.children}
                        </SettingsDropdown>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.Fragment>
    );
}

/*
<ElevationScroll {...props}>
*/