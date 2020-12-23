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
    @observable paper = null
    @observable current_state = {
        paper_name: null,
        loaded: false,
        downloaded: false,
        page: -1
    }



    initState () {
        this.current_state = {
            iid: 0,
            pageNumber: 1,
            numPages: 0,
        }
    }

    @action updateNumPages = numPages => {
        this.current_state.numPages = numPages;
    }

    @action updatePageNumber = pageNumber => {
        if (pageNumber >= 1 && pageNumber <= this.current_state.numPages)
            this.current_state.pageNumber = pageNumber;
    }

    openPdf = (file) => {
        this.paper = file;
    };

    @computed get updatePdfUrl() {
        return this.paper;
    };

    checkUploadedile = () => {

    };

    checkSaveFile = () => {

    };

    saveFile = () => {

    };
}

export default Data;