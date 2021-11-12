import './App.css';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import React, {useState} from 'react'
import "./App.css"

function App() {
  const [state, setState] = useState("search");

  return (
    <div>
      <nav className="nav">
          <text className="nav-link" onClick={() => setState("search")}>Search</text>
          <text className="nav-link" onClick={() => setState("upload")}>Upload</text>
        </nav>
      <div className="App">
        {state == "search" ? <SearchPage /> : <UploadPage />}
      </div>
    </div>
  );
}

export default App;
