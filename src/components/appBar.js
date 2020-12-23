import React from 'react';
import {inject, observer} from "mobx-react";
import {makeStyles, CssBaseline} from "@material-ui/core";
import logo from '../resource/logo-visimages.png';
import filelogo from '../resource/file-logo.svg';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        width: '100%',
        height: '8vh',
        backgroundColor: '#ADDFFF',
    },
    logo: {
        float: 'left',
        position: 'relative',
        height: '80%',
        left: '30px',
        top: '10%',
    },
    right: {
        float: 'right',
        left: '-30px',
        right: '30px'
    }
  }));


function AppBar({d}){
    const classes = useStyles();

    const uploadClick = () => {
        const input = document.createElement('input');
        const {openPdf} = d;
        input.type = 'file';
        input.accept = '*.pdf';
        input.onchange = e => {
            const file = e.target.files[0];
            console.log(file.name)
            console.log(file)
            openPdf(file);
            // console.log(URL.createObjectURL(file))
            // setVideoName(file.name);
            // setVideoSrc(URL.createObjectURL(file));
            // setFileObj(file);
        }
        input.click();
    }

    return (<div className={classes.root}>
        <img className={classes.logo} src={logo}/>
        <img className={clsx(classes.logo, classes.right)} src={filelogo} onClick = {uploadClick}/>
    </div>);
}

export default inject('d')(observer(AppBar));