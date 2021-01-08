import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { inject, observer } from "mobx-react";

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { SlowMotionVideo } from '@material-ui/icons';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        flexBasis: 1,
        position: 'relative',
        maxWidth: '50%',
        display: 'block',
        backgroundColor: 'gray',
    },
    nav: {
        width: '100%',
        height: '5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        margin: "0px 10px 0px 10px",
        height: '50%',
    },
    pdf: {
        display: 'block',
        height: '95%',
        backgroundColor: 'gray',
        overflow: 'scroll',
    },
    document: {
        display: 'flex',
        flex: '1 1 auto'
    },
    page: {
        position: 'absolute',
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

    onPageLoadSuccess = ({height, width}) => {
        console.log(height, width);
        this.setState({dimensions: {height: height, width, width}});
        console.log(this.state);
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
        const { pageNumber, numPages } = this.props.d.current_state;
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
                <div className={classes.pdf}>
                    <Document
                        className={classes.document}
                        file={pdf}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                        onLoadError={console.error}
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={680}
                            scale={this.props.d.current_state.scale}
                            className={classes.page}
                            onLoadSuccess={this.onPageLoadSuccess}
                        // width = {classes.page.width}
                        >      
                            {currentBox.length !== 0 && <div className={classes.bbox}
                                style={
                                    {
                                    left: `${100 * currentBox[0] / this.state.dimensions.width}%`,
                                    top: `${100 * currentBox[1] / this.state.dimensions.height}%`,
                                    width: `${100 * (currentBox[2] - currentBox[0]) / this.state.dimensions.width}%`,
                                    height: `${100 * (currentBox[3] - currentBox[1]) / this.state.dimensions.height}%`,
                                    // borderColor: ColorStyles[value.visType],
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    // visibility: value.visibility,
                                    }}></div>}
                        </Page>
                    </Document>

                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(PdfFigureView)