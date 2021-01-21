import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { inject, observer } from "mobx-react";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { SlowMotionVideo } from '@material-ui/icons';
import clsx from 'clsx';
import { Rnd } from 'react-rnd';

const pdf_width = 1000;

const useStyles = theme => ({
    root: {
        width: pdf_width,
        position: 'relative',
        maxWidth: '50%',
        display: 'block',
    },
    nav: {
        width: '100%',
        height: '5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1b254',
    },
    btn: {
        margin: "0px 10px 0px 10px",
        height: '50%',
    },
    pdf_view: {
        display: 'block',
        position: 'relative',
        height: '95%',
        backgroundColor: 'gray',
        overflow: 'scroll',
    },
    pdf_container: {
        // left: '50%',
        // marginRight: '-50%',
        // transform: 'translate(-50%, 0)',
        position: 'absolute',
        display: 'flex'
    },
    document: {
        display: 'flex',
        flex: '1 1 auto'
    },
    page: {
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center'
    },
    bbox: {
        position: 'absolute',
        color: 'black'
    },
    resize: {
        resize: 'both'
    }
});

@inject('d')
@observer
class PdfFigureView extends React.Component {
    constructor(props) {
        super(props);
    }


    onDocumentLoadSuccess = ({ numPages }) => {
        console.log("pages:", numPages);
        const { updateNumPages } = this.props.d;
        updateNumPages(numPages);
        // this.setState({ numPages });
        console.log("metaaaa", this.props.d.current_state)
    };

    onPageLoadSuccess = (info) => {
        const { height, width } = info;
        //console.log(info);
        const {updateDim} = this.props.d;
        updateDim(width, height);
        //console.log(this.state);
        //console.log("metaaaa", this.props.d.current_state)
    }


    // goToPrevPdf = () => {
    //   const {updatePdfNumber} = this.props.d;
    //   updatePdfNumber(this.props.d.current_state.ppid - 1);
    //   console.log("metaaaa",this.props.d.current_state)
    // }
    // goToNextPdf = () => {
    //   const {updatePdfNumber} = this.props.d;
    //   updatePdfNumber(this.props.d.current_state.ppid + 1);
    //   console.log("metaaaa",this.props.d.current_state)
    // }
    scaleUp = () => {
        const { updateScale } = this.props.d;
        updateScale(this.props.d.current_state.scale + 0.5);
        console.log("metaaaa", this.props.d.current_state)
    }
    scaleDown = () => {
        const { updateScale } = this.props.d;
        updateScale(this.props.d.current_state.scale - 0.5);
        console.log("metaaaa", this.props.d.current_state)
    }

    goToPrevPage = () => {
        const { updatePageNumber } = this.props.d;
        updatePageNumber(this.props.d.current_state.pageNumber - 1);
        console.log("metaaaa", this.props.d.current_state)
    }
    goToNextPage = () => {
        const { updatePageNumber } = this.props.d;
        updatePageNumber(this.props.d.current_state.pageNumber + 1);
        console.log("metaaaa", this.props.d.current_state)
    }
    render() {
        const { classes } = this.props;
        const pdf = this.props.d.updatePdfUrl;
        const { currentBox, confirmed, currentIndex } = this.props.d.data_state;
        const { setCurrentBox, onListIndex } = this.props.d;
        const {width, height} = this.props.d.current_state.dimensions;
        const {scale} = this.props.d.current_state;


        return (
            <div className={classes.root}>
                <nav className={classes.nav}>
                    <button className={classes.btn} onClick={this.scaleDown}>Scale Down</button>
                    <button className={classes.btn} onClick={this.goToPrevPage}>Prev Page</button>
                    <p>
                        Page {this.props.d.current_state.pageNumber} of {this.props.d.current_state.numPages}
                    </p>
                    <button className={classes.btn} onClick={this.goToNextPage}>Next Page</button>
                    <button className={classes.btn} onClick={this.scaleUp}>Scale Up</button>
                </nav>
                <div className={classes.pdf_view}>
                    <div className={classes.pdf_container}>
                        <Document
                            className={classes.document}
                            file={pdf}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            onLoadError={console.error}
                        >
                            <Page
                                pageNumber={this.props.d.current_state.pageNumber}
                                width={pdf_width}
                                scale={this.props.d.current_state.scale}
                                className={classes.page}
                                onLoadSuccess={this.onPageLoadSuccess}
                            // width = {classes.page.width}
                            />
                        </Document>
                        {currentBox.length !== 0 &&
                            <Rnd className={classes.bbox}
                                size={{
                                    width: width * scale * (currentBox[2] - currentBox[0]),
                                    height: height * scale * (currentBox[3] - currentBox[1]),
                                }}
                                position={{
                                    x: width * scale * currentBox[0],
                                    y: height * scale * currentBox[1],
                                }}
                                onDragStop={(me, de) => {
                                    const delta = {
                                        width: 0,
                                        height: 0
                                    };
                                    const position = {
                                        x: de.x,
                                        y: de.y
                                    };
                                    setCurrentBox(delta, position)
                                }}
                                onResizeStop={(e, direction, ref, delta, position) => {
                                    setCurrentBox(delta, position)
                                }}
                                style={{
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    color: confirmed? 'green':'blue',
                                    visibility: !confirmed || this.props.d.data_base[currentIndex].page === this.props.d.current_state.pageNumber ? 'visible' : 'hidden',
                                }}
                            >
                            </Rnd>}
                        {this.props.d.data_base.map((value, index) =>
                            <Rnd className={clsx(classes.bbox)}
                                size={{
                                    width: width * scale * (value.bbox[2] - value.bbox[0]),
                                    height: height * scale * (value.bbox[3] - value.bbox[1]),
                                }}
                                position={{
                                    x: width * scale * value.bbox[0],
                                    y: height * scale * value.bbox[1],
                                }}
                                onClick={onListIndex.bind(this, index)}
                                style={
                                    {
                                        borderWidth: '2px',
                                        borderStyle: 'solid',
                                        visibility: index !== currentIndex && value.page === this.props.d.current_state.pageNumber ? 'visible' : 'hidden',
                                        borderColor: value.confirmed ? 'green' : 'grey',
                                    }}>
                            </Rnd>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(PdfFigureView)