import React from 'react';
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
        maxHeight: '100%',
        maxWidth: '100%',
        backgroundColor: 'gray',
        overflow: 'scroll',
    },
    document: {
        display: 'flex',
        flex: '1 1 auto'
    },
    page: {
        // position: 'relative',
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center'
    },
    bbox: {
        borderStyle: 'solid',
        borderWidth: 3,
        position: 'fixed',
        color: 'green',
        left: 50,
        top: 150,
        width: 50,
        height: 50,
        zIndex: 100,
    }
});

@inject('d')
@observer
class PdfFigureView extends React.Component {

    onDocumentLoadSuccess = ({ numPages }) => {
        console.log("pages:", numPages);
        const { updateNumPages } = this.props.d;
        updateNumPages(numPages);
        // this.setState({ numPages });
        console.log("metaaaa", this.props.d.current_state)
    };

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

                <div className={classes.bbox}></div>
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
                        // width = {classes.page.width}
                        />
                    </Document>

                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(PdfFigureView)