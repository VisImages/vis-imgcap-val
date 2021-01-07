import AppBar from "./components/appBar";
import PdfFigureView from "./components/pdfFigureView";
import AnnoView from "./components/annoView";

import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  screen_root: {
      width: '100vw',
      height: '100vh',
      left: 0,
      right: 0,
      overflow: 'hidden'
      // backgroundColor: theme.palette.primary.main,
  },
  main: {
    display: 'flex',
    width: '100%',
    height: '92%'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.screen_root}>
      <AppBar/>
      <div className={classes.main}>
        <PdfFigureView/>
        <AnnoView/>
      </div>
    </div>
  );
}

export default App;
