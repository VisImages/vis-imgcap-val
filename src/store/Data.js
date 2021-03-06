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
            paperid: 'paper',
            dimensions: {
                width: 1,
                height: 1,
            }
        };
        this.data_state = {
            loaded: false,
            currentIndex: -1,
            currentBox: [0, 0, 0.1, 0.1],
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
            bbox: [0.25, 0.25, 0.5, 0.5],
            caption_text: "",
            confirmed: false,
        });
        this.data_state.currentBox = [0.25, 0.25, 0.5, 0.5];
    }

    @action onDelete = (index, e) => {
        this.data_base.splice(index, 1);
        if (index > this.data_state.currentIndex) {
        } else if (this.data_state.currentIndex > 0) { 
            this.onListIndex(this.data_state.currentIndex - 1) 
        } else if (this.data_base.length > 0) {
            this.onListIndex(0);
        } else this.current_state.currentIndex = -1;
        //console.log(this.current_state.pageNumber)
    }

    @action onListIndex = (index, e) => {
        if (this.data_state.currentIndex === index) return;
        this.updatePageNumber(this.data_base[index].page);
        this.data_state.currentBox = this.data_base[index].bbox;
        this.data_state.currentIndex = index;
    }

    @action setCurrentBox = (delta, position) => {
        const { width, height } = delta;
        const width_dimension = this.current_state.dimensions.width * this.current_state.scale;
        const height_dimension = this.current_state.dimensions.height * this.current_state.scale;
        const { x, y } = position;
        const { currentBox } = this.data_state;
        //console.log(x, y, width, height);
        this.data_state.currentBox = [
            x / width_dimension,
            y / height_dimension,
            currentBox[2] - currentBox[0] + width / width_dimension + x / width_dimension,
            currentBox[3] - currentBox[1] + height / height_dimension + y / height_dimension,
        ]
        this.data_base[this.data_state.currentIndex].confirmed = false;
        this.data_state.saved = false;
        this.data_base[this.data_state.currentIndex].bbox = [...this.data_state.currentBox];
        console.log("data base", this.data_base);
        //console.log(this.data_state.currentBox);
    }


    @computed get allConfirmed() {
        let flag = true;
        this.data_base.forEach(element => {
            if (!element.confirmed) flag = false;
        });
        return flag
    }

    @action openPdf = (file) => {
        this.initState();
        this.current_state.paper = file;
        this.current_state.scale = 1;
        this.current_state.paperid = file.name.split('.')[0];
        this.data_state.loaded = true;
        // this.data_state.saved = false;
        this.current_state.pageNumber = 1;
        if (this.metaData.hasOwnProperty(this.current_state.paperid)) {
            this.data_base = this.metaData[this.current_state.paperid];
            if (this.data_base.length > 0) {
                this.data_state.currentIndex = 0;
                this.data_state.currentBox = this.data_base[0].bbox;
                this.current_state.pageNumber = this.metaData[this.current_state.paperid][0].page;
            }
        }
    };

    @action loadJson = (data) => {
        this.data_state = {
            loaded: false,
            currentIndex: -1,
            currentBox: [0, 0, 0.1, 0.1],
            saved: true,
        };
        this.current_state.pageNumber = 1;
        this.data_base = JSON.parse(data);
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
        this.data_state.saved = true;
    };
}

export default Data;