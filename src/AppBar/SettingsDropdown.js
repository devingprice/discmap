import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';

import './style.css';

export default (props) => {
    const [anchorElPop, setAnchorElPop] = React.useState(null);
    const popOpen = Boolean(anchorElPop);
    const id = popOpen ? 'settings-popover' : undefined;

    const handleClickPop = (event) => {
        setAnchorElPop(event.currentTarget);
    };

    const handleClosePop = () => {
        setAnchorElPop(null);
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="settings"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickPop}
                color="inherit"
            >
                <Settings />
            </IconButton>
            
            <Popover
                id={id}
                open={popOpen}
                anchorEl={anchorElPop}
                onClose={handleClosePop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {props.children}
            </Popover>
        </React.Fragment>
    )
}