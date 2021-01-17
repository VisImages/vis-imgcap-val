import React from 'react';
import { makeStyles, Card, Input, Container, Button, Typography } from '@material-ui/core'
import { inject, observer } from "mobx-react";
import addlogo from '../resource/add.svg';
import deletelogo from '../resource/delete.svg';

const useStyles = makeStyles(theme => ({
    root: {
        flexBasis: 1,
        flexGrow: 1,
        height: '100%',
        overflowY: 'scroll',
    },
    main: {
        display: 'flex',
        margin: '5px 10px 5px 10px',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        width: '100%'
    },
    caption: {
        padding: '10px',
        width: '90%'
    },
    buttonGroup: {
        display: 'flex',
        width: '10%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyItems: 'center',
        alignItems: 'center'
    },
    button: {
        width: '50%',
        height: '50%',
    },
    confirm: {
        width: '10%',
        padding: '10px',
        margin: "5px 10px 5px 10px",
    }
}))


function AnnoView({ d }) {
    let captionList = d.captionList
    const { onAdd, onDelete, onListIndex, checkAllConfirmed } = d;

    const onChange = (index, e) => {
        console.log(e.target.value)
        captionList[index] = e.target.value;
    };

    const onConfirm = index => {
        //this.data_state.confirmed = true;
        console.log(captionList[index])
        d.data_base[index].confirmed = !d.data_base[index].confirmed;
        if (d.data_base[index].confirmed){
            d.data_base[index].confirmed = true;
            d.data_base[index].caption_text = captionList[index];
            d.data_base[index].bbox = d.data_state.currentBox
            checkAllConfirmed();
        }
    }

    console.log(d.current_state);
    const classes = useStyles();
    return <div className={classes.root}>
        {d.captionList.map((value, index) =>
            <div className={classes.main} key={index}>
                <Card className={classes.card} key={new Date().getTime()}>
                    <Input className={classes.caption} onClick={onListIndex.bind(this, index)} onChange={onChange.bind(this, index)} defaultValue={value} multiline></Input>
                    <Container className={classes.buttonGroup}>
                        <img className={classes.button} src={addlogo} alt="" onClick={onAdd.bind(this, index)}></img>
                        <img className={classes.button} src={deletelogo} alt="" onClick={onDelete.bind(this, index)}></img>
                    </Container>
                </Card>
                <Button className={classes.confirm} variant="contained" onClick={onConfirm.bind(this, index)} color={d.data_base[index].confirmed ? 'primary' : 'default'}>confirm</Button>
            </div>
        )}
    </div>
};

export default inject('d')(observer(AnnoView));