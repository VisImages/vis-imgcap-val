import { action, computed, observable } from "mobx";
import pacificvis_data from "../resource/pacificvis_data.json"

class Data {
    constructor(root) {
        this.root = root
    }

    init() {
        this.initState();
        this.readMeta();
        // console.log(this.metaData);
        // console.log(this.paperList);
    }
    @observable current_state = {}

    initState() {
        this.current_state = {
            paper: 0,
            pageNumber: 1,
            numPages: 0,
            scale: 1,
            visimages_data: [],
            paperid: -1,
        }
    }

    readMeta = () => {
        this.metaData = pacificvis_data;
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
        this.current_state.paperid = file.name.split('.')[0];
        this.current_state.visimages_data = this.metaData[this.current_state.paperid]
    };

    @computed get updatePdfUrl() {
        return this.current_state.paper;
    };

    @computed get annoList() {
        let annoList = [];
        for (let i = 0; i < this.current_state.visimages_data.length; i++) {
            annoList.push(this.current_state.visimages_data[i].bbox.join(','));
        }
        return annoList;
    }

    @computed get captionList() {
        let captionList = [];
        for (let i = 0; i < this.current_state.visimages_data.length; i++) {
            captionList.push(this.current_state.visimages_data[i].caption_text);
        }
        return captionList;
    }

    checkUploadedfile = () => {

    };

    checkSaveFile = () => {

    };

    saveFile = () => {

    };
}

export default Data;