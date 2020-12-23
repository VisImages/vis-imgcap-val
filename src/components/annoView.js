import React from 'react';
import {makeStyles} from '@material-ui/core'
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        height: '100%',
    }
}))


function AnnoView({d}) {
    console.log(d.current_state);
    const classes = useStyles();
    return (
        <div className={classes.root}></div>
    )
};

export default inject('d')(observer(AnnoView));