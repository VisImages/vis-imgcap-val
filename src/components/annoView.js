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
        width: '100%',
    },
    caption: {
        padding: '10px',
        width: '90%',
    },
    captionSelected: {
        padding: '10px',
        width: '90%',
        color: 'blue',
    },
    captionConfirmed: {
        padding: '10px',
        width: '90%',
        color: 'green',
    },
    nullButton: {
        display: 'flex',
        width: '100%',
        height: '80px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonGroup: {
        display: 'flex',
        width: '10%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '30px',
        height: '30px',
        padding: '5px'
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
        d.data_base[index].confirmed = false;
    };

    const onConfirm = index => {
        //this.data_state.confirmed = true;
        console.log(captionList[index])
        d.data_base[index].confirmed = !d.data_base[index].confirmed;
        if (d.data_base[index].confirmed) {
            d.data_base[index].caption_text = captionList[index];
            d.data_base[index].bbox = d.data_state.currentBox;
        }
    }

    console.log(d.current_state);
    const classes = useStyles();
    return <div className={classes.root}>
        {d.data_base.length === 0 && d.data_state.loaded?
            <div className={classes.nullButton}>
                <img className={classes.button} 
                    src={addlogo} 
                    onClick={onAdd.bind(this, -1)} 
                    alt="" />
                <Typography style={{color: 'grey'}}>
                    click to add first item
                </Typography>
            </div>: null}
        {d.captionList.map((value, index) =>
            <div className={classes.main} key={index}>
                <Card className={classes.card} key={new Date().getTime()}>
                    <Input className={
                        d.data_base[index].confirmed ? classes.captionConfirmed :
                        (index === d.data_state.currentIndex ? classes.captionSelected : classes.caption)}
                        onClick={onListIndex.bind(this, index)} 
                        onChange={onChange.bind(this, index)} 
                        defaultValue={value} multiline rows='4'></Input>
                    <Container className={classes.buttonGroup}>
                        <img className={classes.button} src={addlogo} alt="" onClick={onAdd.bind(this, index)}></img>
                        <img className={classes.button} src={deletelogo} alt="" onClick={onDelete.bind(this, index)}></img>
                    </Container>
                </Card>
                <Button className={classes.confirm} 
                    variant="contained" 
                    onClick={onConfirm.bind(this, index)}
                    disabled={d.data_base[index].confirmed}
                    color={index === d.data_state.currentIndex?'primary':d.data_base[index].confirmed ? 'primary' : 'secondary'}>
                    confirm
                </Button>
            </div>
        )}
    </div>
};

export default inject('d')(observer(AnnoView));