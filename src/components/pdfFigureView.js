import React from 'react';
import {makeStyles} from '@material-ui/core';
import PDFJS from 'pdfjs-dist/webpack';
import {PDFtoIMG} from 'react-pdf-to-image';
import file from '../pdf-sample.pdf';

const useStyles = makeStyles(theme => ({
    display: 'block',
    height: '100%',
    width: '50vw',
    backgroundColor: 'gray',
}))


function PdfFigureView() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PDFtoIMG file={file}>
                {({pages}) => {
                    if (!pages.length) return 'Loading...';
                    return pages.map((page, index)=>
                        <img key={index} src={page}/>
                    );
                }}
            </PDFtoIMG>
        </div>
    )
}

export default PdfFigureView;