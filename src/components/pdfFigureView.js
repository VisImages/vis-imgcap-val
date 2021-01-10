import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { inject, observer } from "mobx-react";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { SlowMotionVideo } from '@material-ui/icons';

const pdf_width = 800;

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
        position: 'absolute'
    }
});

@inject('d')
@observer
class PdfFigureView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                height: 1,
                width: 1,
            }
        }
    }


    onDocumentLoadSuccess = ({ numPages }) => {
        console.log("pages:", numPages);
        const { updateNumPages } = this.props.d;
        updateNumPages(numPages);
        // this.setState({ numPages });
        console.log("metaaaa", this.props.d.current_state)
    };

    onPageLoadSuccess = (info) => {
        const {height, width} = info;
        console.log(info);
        this.setState({dimensions: {height: height, width, width}});
        console.log(this.state);
        console.log("metaaaa", this.props.d.current_state)
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
        console.log(pdf)
        console.log("render component", this.props.d.current_state);
        const {currentBox} = this.props.d;


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
                        {currentBox.length !== 0 && <div className={classes.bbox}
                            style={
                                {
                                // left: `${100 * currentBox[0] * pdf_width / this.state.dimensions.width}%`,
                                // top: `${100 * currentBox[1] * pdf_width / this.state.dimensions.height}%`,
                                // width: `${100 * (currentBox[2] - currentBox[0]) * pdf_width / this.state.dimensions.width}%`,
                                // height: `${100 * (currentBox[3] - currentBox[1]) * pdf_width / this.state.dimensions.height}%`,
                                left: `${100 * currentBox[0]}%`,
                                top: `${100 * currentBox[1]}%`,
                                width: `${100 * (currentBox[2] - currentBox[0])}%`,
                                height: `${100 * (currentBox[3] - currentBox[1])}%`,
                                // borderColor: ColorStyles[value.visType],
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                // visibility: value.visibility,
                                }}></div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(PdfFigureView)