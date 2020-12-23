import Data from './Data'


class Store {
    d = new Data(this);

    constructor () {
        this.d.init();
    }
}

const store = new Store();

export default store;