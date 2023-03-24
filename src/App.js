import React, {useEffect, useState} from "react";
import Footer from "./components/Footer";
import Graph from "./components/Graph";
import LeftSidebar from "./components/LeftSidebar";
import Menubar from "./components/Menubar";
import RightSidebar from "./components/RightSidebar";
import Toolbar from "./components/Toolbar"

import "./index.css"

function App() {
    const [userData,setUserData]= useState({
        login: localStorage.getItem("login"),
        tokens: localStorage.getItem("tokens")
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setUserData({
                login: localStorage.getItem("login"),
                tokens: localStorage.getItem("tokens")
            });
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);



  return (
    <div className="App bg-gray-200 w-screen h-screen flex flex-col">
      <div className="w-100 flex flex-col border-b border-gray-600">
        <Menubar user={userData}/>
        <Toolbar user={userData}/>
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
