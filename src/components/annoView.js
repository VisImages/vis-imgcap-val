import React from 'react';
import { makeStyles, Card, Typography, Container, Button } from '@material-ui/core'
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
        margin: "0px 10px 0px 10px",
    }
}))


function AnnoView({ d }) {
    const { onAdd,onDelete,onPageNumber } = d
    console.log(d.current_state);
    const classes = useStyles();
    return <div className={classes.root}>
        {d.captionList.map((value, index) =>
            <div className={classes.main}>
                <Card className={classes.card} key={index}>
                    <Typography className={classes.caption} onClick={onPageNumber.bind(this,index)}>{value}</Typography>
                    <Container className={classes.buttonGroup}>
                        <img className={classes.button} src={addlogo} alt="" onClick={onAdd.bind(this,index)}></img>
                        <img className={classes.button} src={deletelogo} alt="" onClick={onDelete.bind(this,index)}></img>
                    </Container>
                </Card>
                <Button className={classes.confirm}>confirm</Button>
            </div>
        )}
    </div>
};

export default inject('d')(observer(AnnoView));