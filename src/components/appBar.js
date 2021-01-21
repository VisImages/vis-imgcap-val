import React from 'react';
import { inject, observer } from "mobx-react";
import { makeStyles, CssBaseline } from "@material-ui/core";
import logo from '../resource/logo-visimages.png';
import filelogo from '../resource/file-logo.svg';
import save from '../resource/save.svg';
import clsx from 'clsx';
import addcaption from '../resource/add-caption.svg';
import { Update } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    bar_root: {
        display: 'block',
        position: 'relative',
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
    save: {
        float: 'left',
        position: 'relative',
        height: '60%',
        left: '30px',
        top: '18%',
    },
    add: {
        float: 'left',
        position: 'relative',
        height: '60%',
        left: '30px',
        top: '20%',
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


function AppBar({ d }) {
    const classes = useStyles();
    const { onAdd } = d;

    const uploadClick = () => {
        const input = document.createElement('input');
        const { openPdf } = d;
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

    const saveClick = () => {
        const { saveFile } = d;
        if (d.data_state.allconfirmed) {
            if (d.data_state.saved) {
                if (window.confirm("你已经保存过一次了，确定要继续保存吗？")) { saveFile(); }
            } else {
                saveFile();
                d.data_state.saved = true;
            }
        } else {
            alert("尚未有未确认的图片！");
        }
    }


    return (<div className={classes.bar_root}>
        <img className={classes.logo} src={logo} alt="" />
        <img className={clsx(classes.logo, classes.right)} src={filelogo} onClick={uploadClick} alt="" />
        <img className={clsx(classes.save, classes.right)} src={save} onClick={saveClick} alt="" />
        {d.data_base.length === 0?<img className={clsx(classes.add, classes.right)} src={addcaption} onClick={onAdd.bind(this,-1)} alt="" />:null}
    </div>);
}

export default inject('d')(observer(AppBar));