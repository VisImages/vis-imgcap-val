import {action, computed, observable} from "mobx";


class Data {
    constructor(root) {
        this.root = root
    }

    init() {
        this.initState();
        // console.log(this.metaData);
        // console.log(this.paperList);
    }
    @observable current_state = {}

    initState () {
        this.current_state = {
            paper: 0,
            pageNumber: 1,
            numPages: 0,
            scale: 1,
        }
    }

    @action updateNumPages = numPages => {
        this.current_state.numPages = numPages;
    }

    @action updatePageNumber = pageNumber => {
        if (pageNumber >= 1 && pageNumber <= this.current_state.numPages)
            this.current_state.pageNumber = pageNumber;
    }

    @action updateScale = newScale => {
        console.log("update scale", newScale)
        if (newScale > 0 && newScale < 4)
            this.current_state.scale = newScale;
    }

    openPdf = (file) => {
        this.current_state.paper = file;
        this.current_state.scale = 1;
    };

    @computed get updatePdfUrl() {
        return this.current_state.paper;
    };

    checkUploadedfile = () => {

    };

    checkSaveFile = () => {

    };

    saveFile = () => {

    };
}

export default Data;