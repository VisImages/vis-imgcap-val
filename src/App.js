import AppBar from "./components/AppBar";
import PdfFigureView from "./components/PdfFigureView";
import AnnoView from "./components/AnnoView";

import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      // backgroundColor: theme.palette.primary.main,
  },
  main: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '92vh'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar/>
      <div className={classes.main}>
        <PdfFigureView/>
        <AnnoView/>
      </div>
    </div>
  );
}

export default App;
