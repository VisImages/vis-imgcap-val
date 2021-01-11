import { action, computed, observable } from "mobx";
import viscaption_data from "../resource/visimages_cap.json"

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
    @observable data_base = [];
    @observable data_state = {};

    initState() {
        this.current_state = {
            paper: 0,
            pageNumber: 1,
            numPages: 0,
            scale: 1,
            paperid: -1,
        };
        this.data_state = {
            loaded: false,
            currentIndex: -1,
            confirmed: false,
            allconfirmed: false,
            saved: false
        };
        this.data_base = [];
    }

    readMeta = () => {
        this.metaData = viscaption_data;
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


    @action onAdd = (index,e) => {
        this.data_state.currentIndex = index + 1;
        const pageNumber = this.data_base[index].page;
        this.data_base.splice(
            this.data_state.currentIndex,0,{
                "page":pageNumber,
                "bbox":[0,0,0.1,0.1],
                "caption_text":"new caption",
            });
        this.current_state.pageNumber = this.data_base[index].page;
        console.log(this.data_base)
    }

    @action onDelete = (index,e) => {
        console.log(index)
        this.data_base.splice(index,1);
        this.data_state.currentIndex = index - 1;
        if(index>0)this.current_state.pageNumber = this.data_base[index-1].page;
        //console.log(this.current_state.pageNumber)
    }

    @action onPageNumber = (index,e) => {
        this.updatePageNumber(this.data_base[index].page)
        this.data_state.currentIndex=index
    }

    openPdf = (file) => {
        this.current_state.paper = file;
        this.current_state.scale = 1;
        this.current_state.paperid = file.name.split('.')[0];
        if (this.metaData.hasOwnProperty(this.current_state.paperid)) {
            this.data_state.loaded = true;
            if (this.metaData[this.current_state.paperid].length > 0) {
                this.data_state.currentIndex = 0;
                this.current_state.pageNumber = this.metaData[this.current_state.paperid][0].page;
            }

            else {
                this.current_state.pageNumber = 1;
                this.data_state.currentIndex = -1;
            }
        }
        this.data_base = this.metaData[this.current_state.paperid]
    };

    @computed get updatePdfUrl() {
        return this.current_state.paper;
    };

    @computed get annoList() {
        let annoList = [];
        for (let i = 0; i < this.data_base.length; i++) {
            annoList.push(this.data_base[i].bbox);
        }
        return annoList;
    }

    @computed get currentBox() {
        if (this.data_base.length > 0 && this.data_state.currentIndex >= 0)
            return this.data_base[this.data_state.currentIndex].bbox;
        return [];
    }

    @computed get captionList() {
        let captionList = [];
        for (let i = 0; i < this.data_base.length; i++) {
            captionList.push(this.data_base[i].caption_text);
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