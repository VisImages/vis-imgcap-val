import React from 'react';
import { inject, observer } from "mobx-react";
import { makeStyles, CssBaseline, IconButton } from "@material-ui/core";
import logo from '../resource/logo-visimages.png';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(theme => ({
    bar_root: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '8%',
        backgroundColor: '#ADDFFF',
    },
    logo: {
        float: 'left',
        padding: '40px',
        position: 'relative',
        height: '60%',
    },
    json: {
        float: 'left',
        position: 'relative',
        height: '80%',
        left: '30px',
        top: '10%',
    },
    icongroup :{
        float: 'right',
        display: 'flex',
        height: '80px',
        width: '80px',
        padding: '40px',
        position:'relative',
        width: '12%'
    },
    button: {
        height: '80px',
        width: '80px',
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
        if (d.allConfirmed) {
            if (d.data_state.saved) {
                if (window.confirm("你已经保存过一次了，确定要继续保存吗？")) { saveFile(); }
            } else {
                saveFile();
            }
        } else {
            alert("尚未有未确认的图片！");
        }
    }

    const openJson = () => {
        const {loadJson} = d;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*.json';
        var reader = new FileReader();
        
        reader.onload = function(event) {
            loadJson(reader.result);
        };
        input.onchange = e => {
            const file = e.target.files[0];
            if (d.current_state.paperid == 'paper'){
                alert('pdf file not loaded!');
                return
            }
            if (file.name.split('.')[0] != d.current_state.paperid){
                alert("pdf name and json name not match!");
                return
            }
            const res = reader.readAsText(file);
        }
        input.click();
    }


    return (<div className={classes.bar_root}>
        <img className={classes.logo} src={logo} alt="" />
        <div className={classes.icongroup}>
            <IconButton className={classes.button} onClick={uploadClick}>
                <PictureAsPdfIcon fontSize="large"/>
            </IconButton>
            <IconButton className={classes.button} onClick={saveClick}>
                <SaveIcon fontSize="large"/>
            </IconButton>
            <IconButton className={classes.button} onClick={openJson}>
                <PublishIcon fontSize="large"/>
            </IconButton>
            {/* <img className={classes.button} src={PictureAsPdfIcon} onClick={saveClick} alt="" />
            <img className={classes.button} src={SaveIcon} onClick={saveClick} alt="" />
            <img className={classes.button} src={PictureAsPdfIcon} onClick={uploadClick} alt="" /> */}
        </div>
        
    </div>);
}

export default inject('d')(observer(AppBar));