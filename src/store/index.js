import Data from './Data'


class Store {
    d = new Data(this);

    constructor () {
        this.d.init();
    }
}

store = new Store();

export default store;