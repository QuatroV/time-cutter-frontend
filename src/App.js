import React, {useEffect, useState} from "react";
import Footer from "./components/Footer";
import Graph from "./components/Graph";
import LeftSidebar from "./components/LeftSidebar";
import Menubar from "./components/Menubar";
import RightSidebar from "./components/RightSidebar";
import Toolbar from "./components/Toolbar"

import "./index.css"
import LoginContextProvider from "./components/Toolbar/components/LoginContext";
import DiagramContextProvider from "./components/DiagramProperties/DiagramContext";
import CurrentItemContextProvider from "./components/DiagramProperties/CurrentItemContext";
import SvgContextProvider from "./components/Graph/components/SvgContext";

function App() {
    const [userData,setUserData]= useState({
        login: sessionStorage.getItem("login"),
        tokens: sessionStorage.getItem("tokens")
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setUserData({
                login: sessionStorage.getItem("login"),
                tokens: sessionStorage.getItem("tokens")
            });
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);



  return (
      <LoginContextProvider>
          <DiagramContextProvider>
              <CurrentItemContextProvider>
                  <SvgContextProvider>
                      <div className="App bg-gray-200 w-screen h-screen flex flex-col">
                          <div className="w-100 flex flex-col border-b border-gray-600 z-20">
                              <Menubar user={userData}/>
                              <Toolbar user={userData}/>
                          </div>
                          <div className="flex flex-1 h-3/5 min-w-full overflow-auto">
                              <LeftSidebar />
                              <Graph />
                              <RightSidebar />
                          </div>
                          <Footer />
                      </div>
                  </SvgContextProvider>
              </CurrentItemContextProvider>
          </DiagramContextProvider>
      </LoginContextProvider>
  );
}

export default App;
