import AppBar from "./components/AppBar";
import PdfFigureView from "./components/PdfFigureView";
import AnnoView from "./components/AnnoView";
import './App.css';

function App() {
  return (
    <div className="App">
      <AppBar/>
      <div className="workingArea">
        <PdfFigureView/>
        <AnnoView/>
      </div>
    </div>
  );
}

export default App;
