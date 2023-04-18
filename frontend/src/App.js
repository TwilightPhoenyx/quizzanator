import { useState, useEffect } from "react";
import { fetchLoadTests } from "./lib/fetch.mjs";

import CreateTest from "./components/CreateTest";
import LoadTests from "./components/LoadTests";

function App() {

  const [tests, setTests] = useState([])

  useEffect(
          updateData,
      []
  );
    
  function updateData(){
    fetchLoadTests(handlerData)
  }

  function handlerData(data) {
      setTests(data)
  };


  return (
    <>
    <CreateTest updateDataFunction={updateData}/>
    <LoadTests loadedTests={tests} updateDataFunction={updateData}/>
    </>
  )
    
}

export default App;
