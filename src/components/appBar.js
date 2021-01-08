import React from 'react';
import {inject, observer} from "mobx-react";
import {makeStyles, CssBaseline} from "@material-ui/core";
import logo from '../resource/logo-visimages.png';
import filelogo from '../resource/file-logo.svg';
import clsx from 'clsx';
import { Update } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    bar_root: {
        display: 'block',
        position:'relative',
        width: '100%',
        height: '8%',
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
    },
    json: {
        float: 'json',
        left: '-20px',
        right: '-20px'
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


    return (<div className={classes.bar_root}>
        <img className={classes.logo} src={logo} alt=""/>
        <img className={clsx(classes.logo, classes.right)} src={filelogo} onClick = {uploadClick} alt=""/>
    </div>);
}

export default inject('d')(observer(AppBar));