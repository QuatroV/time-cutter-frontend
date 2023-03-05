import React from "react";
import Footer from "./components/Footer";
import Graph from "./components/Graph";
import LeftSidebar from "./components/LeftSidebar";
import Menubar from "./components/Menubar";
import RightSidebar from "./components/RightSidebar";
import Toolbar from "./components/Toolbar"

import "./index.css"

function App() {
  return (
    <div className="App bg-gray-200 w-screen h-screen flex flex-col">
      <div className="w-100 flex flex-col border-b border-gray-600">
        <Menubar/>
        <Toolbar />
      </div>
      <div className="w-100 flex flex-1">
        <LeftSidebar /> 
        <Graph />
        <RightSidebar />
      </div>
    <Footer />  
    </div>
  );
}

export default App;
