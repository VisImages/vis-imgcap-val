import React from 'react';
import { makeStyles, Card, Typography, Container, Button } from '@material-ui/core'
import { inject, observer } from "mobx-react";
import addlogo from '../resource/add.svg';
import deletelogo from '../resource/delete.svg';

const useStyles = makeStyles(theme => ({
    root: {
        flexBasis: 1,
        flexGrow: 1,
        maxWidth: '50%',
        height: '100%',
        overflowY: 'scroll',
    },
    card: {
        margin: '5px 10px 5px 10px',
        width: '80%'
    },
    button: {
        width: '5%',
        height: '5%',
    },
    main: {
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        flexDirection: 'row-reverse',
    },
    confirm: {
        margin: "0px 10px 0px 10px",
    }
}))


function AnnoView({ d }) {
    console.log(d.current_state);
    const classes = useStyles();
    return <div className={classes.root}>
        {d.captionList.map((value, index) =>
            <div className={classes.main}>
                <Card className={classes.card} key={index}>
                    <Typography className={classes.card} variant='h4'>{value}</Typography>
                </Card>
                <Container className={classes.buttonGroup}>
                    <img className={classes.button} src={addlogo} alt=""></img>
                    <img className={classes.button} src={deletelogo} alt=""></img>
                </Container>
                <Button className={classes.confirm}>confirm</Button>
            </div>
        )}
        {d.annoList.map((value, index) =>
            <div className={classes.main}>
                <Card className={classes.card} key={index}>
                    <Typography className={classes.card} variant='h4'>{value}</Typography>
                </Card>
            </div>
        )}
    </div>
};

export default inject('d')(observer(AnnoView));