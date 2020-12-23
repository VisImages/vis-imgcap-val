# API Documentation

## Data.js
This is the module maintaining all data using `mobx-react`. 
All front end components interact with the `store/Data.js` directly.
The data is maintained in the `class Data`.
The `class Data` is instantiated as `d` in the `class Store` in the `store/index.js`.
The `class Store` is further instantiated and exported as `store`.

The instantiated `store` is provided for the `<App>` in the `src/index.js` using `<Provider>` from `mobx-react`.
For the components that need to access the data, the data `d` should be injected into the component using `inject` function from `mobx-react` and the components should be decorated with `observer`. A case can be found in the `src/components/AppBar.js`.

### Data Structure


## 
