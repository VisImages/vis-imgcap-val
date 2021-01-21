import { action, computed, observable } from "mobx";
import viscaption_data from "../resource/visimages_cap.json";
import { saveAs } from "file-saver";

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
            dimensions: {
                width: 1,
                height: 1,
            }
        };
        this.data_state = {
            loaded: false,
            currentIndex: -1,
            currentBox: [0, 0, 0.1, 0.1],
            allconfirmed: false,
            saved: false,
        };
        this.data_base = [];
    }

    readMeta = () => {
        this.metaData = viscaption_data;
    }

    @action updateDim = (width, height) => {
        this.current_state.dimensions.width = width;
        this.current_state.dimensions.height = height;
    }

    @action updateNumPages = numPages => {
        this.current_state.numPages = numPages;
    }

    @action updatePageNumber = pageNumber => {
        if (pageNumber >= 1 && pageNumber <= this.current_state.numPages)
            this.current_state.pageNumber = pageNumber;
        //if (!this.data_base[this.data_state.currentIndex].confirmed) this.data_base[this.data_state.currentIndex].page = pageNumber;
    }


    @action updateScale = newScale => {
        console.log("update scale", newScale)
        if (newScale > 0 && newScale < 4) {
            this.current_state.scale = newScale;
        }

    }


    @action onAdd = (index, e) => {
        this.data_state.currentIndex = index + 1;
        this.data_base.splice(
            index + 1, 0, {
            //name:
            page: this.current_state.pageNumber,
            bbox: [0, 0, 0.1, 0.1],
            caption_text: "new caption",
            confirmed: false,
        });
        this.data_state.currentBox = [0, 0, 0.1, 0.1];
        this.checkAllConfirmed();
    }

    @action onDelete = (index, e) => {
        this.data_base.splice(index, 1);
        if (this.data_base.length > index) {
            this.onListIndex(index);
        } else if (index > 0) { this.onListIndex(index - 1) }
        else if (this.data_base.length > 0) {
            this.onListIndex(0);
        }else this.current_state.currentIndex = -1;
        //console.log(this.current_state.pageNumber)
        this.checkAllConfirmed();
    }

    @action onListIndex = (index, e) => {
        if (this.data_state.currentIndex === index) return;
        this.updatePageNumber(this.data_base[index].page);
        this.data_state.currentBox = this.data_base[index].bbox;
        this.data_state.currentIndex = index;
    }

    @action setCurrentBox = (delta, position) => {
        const { width, height } = delta;
        const { x, y } = position;
        const { currentBox } = this.data_state;
        //console.log(x, y, width, height);
        this.data_state.currentBox = [
            x / this.current_state.dimensions.width,
            y / this.current_state.dimensions.height,
            currentBox[2] - currentBox[0] + width / this.current_state.dimensions.width + x / this.current_state.dimensions.width,
            currentBox[3] - currentBox[1] + height / this.current_state.dimensions.height + y / this.current_state.dimensions.height,
        ]
        this.data_base[this.data_state.currentIndex].confirmed = false;
        console.log("data base", this.data_base);
        //console.log(this.data_state.currentBox);
    }

    @action checkAllConfirmed = () => {
        let flag = true;
        this.data_base.forEach(element => {
            if (!element.confirmed) flag = false;
        });
        if (flag) {
            this.data_state.allconfirmed = true;
        }
    }

    openPdf = (file) => {
        this.initState();
        this.current_state.paper = file;
        this.current_state.scale = 1;
        this.current_state.paperid = file.name.split('.')[0];
        if (this.metaData[this.current_state.paperid]) {
            this.data_base = this.metaData[this.current_state.paperid];
        } else {
            this.data_base = [{
                //name:
                page: this.current_state.pageNumber,
                bbox: [0, 0, 0.1, 0.1],
                caption_text: "please add captions",
                confirmed: false,
            }]
        }
        if (this.metaData.hasOwnProperty(this.current_state.paperid)) {
            this.data_state.loaded = true;
            if (this.metaData[this.current_state.paperid].length > 0) {
                this.data_state.currentIndex = 0;
                this.data_state.currentBox = this.data_base[0].bbox;
                this.current_state.pageNumber = this.metaData[this.current_state.paperid][0].page;
            }

            else {
                this.current_state.pageNumber = 1;
                this.data_state.currentIndex = -1;
            }
        }
    };

    @computed get updatePdfUrl() {
        return this.current_state.paper;
    };

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
        const data = JSON.stringify(this.data_base);
        let blob = new Blob([data], { type: 'text/json' });
        let filename = this.current_state.paperid + '.json';
        saveAs(blob, filename);
    };
}

export default Data;