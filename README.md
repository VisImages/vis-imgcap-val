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
`current_state` records the information and the state of the pdf file rendered in the PdfFigureView.js.
```json
current_state = {
    pdf: file(loaded_pdf_file),
    pageNumber: int(current_page_number),
    numPages: int(total_number_of_pages),
    scale: float(pdf_scale),
}
```
`data_state` records the imported json data. 
```json
data_state = {
    loaded: boolen(the_data_is_loaded_or_not),
    currentIndex: int(index_of_current_validating_figure),
    confirmed: boolen(confirmation_state_of_current_figure),
    allConfirmed: boolen(all_figures_are_confirmed_or_not),
    saved: boolen(save_the_data_or_not)
}
```
`data_base` store the data of the figures. If the data of current figure is changed, change it in the `data_base` after confirmation.
```json
data_base = [
    {
        name: string(figure_name),
        caption: string(caption_extracted),
        position: array(bounding_box_corner_coordinates)
        confirmed: boolen(figure_confirmed_or_not)
    }
]
```

## PdfFigureView.js
This view presents the loaded pdf file, providing pdf control functions, including page change, scale up, scale down. The bounding box of the current figure should also visualized on the pdf file.

TODO List:
- [x] Page changing
- [x] Scale up and down
- [ ] Figure position visualization
- [ ] Figure position modification

## AnnoView.js
This view presents the extracted captions of the figures. The view includes a list of captions and a confirmation button. There are four essential interactions:
1. Select a caption by clicking. The `PdfFigureView` changes accordingly. If this caption is confirmed, the confirmation button is disabled. 
2. Modify a caption or the position of its figure. Once modified, the confirmation button is activated and require additional confirm to this figure data.
3. Confirm the position and caption of a figure. If not confirmed, the edge of caption box is visualized with gray. If confirmed, visualize it with green.
4. Delete a figure. Delete the data from the `data_base`.
5. Add a new figure. The new figure will be added after the current figure.

TODO List:
- [ ] Selection
- [ ] Modification
- [ ] Confirmation
- [ ] Deletion
- [ ] Addition

## AppBar.js
The `AppBar.js` provides pdf loading and data saving functions.
1. Pdf loading. Check if the data is loaded. If loaded, check if it is saved. If loaded and saved, then load a new pdf file. Else, ask the user to finish and save the current tasks.
2. Data Saving. Check if all figures are confirmed. If yes, save the data by downloading it. Else, ask the user to confirm all the figures.

TODO List:
- [ ] Loading
- [ ] Checking before loading
- [ ] Saving