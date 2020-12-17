import {action, computed, observable} from "mobx";


class Data {
    constructor(root) {
        this.root = root
    }

    @observable.shallow paper = null
    @observable.shallow current_state = {
        paper_name: null,
        loaded: false,
        downloaded: false,
        page: -1
    }

    openPdf = (file) => {
        this.paper = file;
    };

    checkUploadedile = () => {

    };

    checkSaveFile = () => {

    };

    saveFile = () => {

    };
}

export default Data;