import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default ({cards, activeCard, setActiveCard}) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Card</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={activeCard}
                onChange={(e)=>{setActiveCard(e.target.value)}}
            >
                <MenuItem value={null}>None</MenuItem>
            {
                Object.values(cards).map((item, index) => (
                    <MenuItem key={index} value={item.uid}>{item.uid} Round: {item.round}</MenuItem>
                ))
            }
            
            </Select>
        </FormControl>
    )
}