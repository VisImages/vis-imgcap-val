import AppBar from "./components/appBar";
import PdfFigureView from "./components/pdfFigureView";
import AnnoView from "./components/annoView";
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
