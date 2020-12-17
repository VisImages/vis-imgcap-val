import React from 'react';
import {inject, observer} from "mobx-react";
import logo from '../resource/logo-visimages.png';
import logofile from '../resource/file-logo.svg';


class AppBar extends React.Component {

    uploadClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*.pdf';
        input.onchange = e => {
            const file = e.target.files[0];
            console.log(file.name)
            console.log(file)
            console.log(URL.createObjectURL(file))
            // setVideoName(file.name);
            // setVideoSrc(URL.createObjectURL(file));
            // setFileObj(file);
        }
        input.click();
    }

    render () {
        return (<div className="appBar">
            <img className="logo" src={logo}/>
            <img className="logo right" src={logofile} onClick = {this.uploadClick}/>
        </div>);
    }
}

export default inject('t')(observer(AppBar));