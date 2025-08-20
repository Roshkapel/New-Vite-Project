import React from "react";
import NavBar from "../NavBar";
import { Calculations } from "./Calculations";


const SalesForcasting = ({users, addDataHandler, removeDataHandler, updateDataHandler, topFiveRevenue }) => {
  return (
    <>
        <NavBar 
          users={users}
          // setResults={setResults}
          addDataHandler={addDataHandler}
          removeDataHandler={removeDataHandler}
          updateDataHandler={updateDataHandler}
          topFiveRevenue={topFiveRevenue}
        />
        <Calculations 
        topFiveRevenue={topFiveRevenue}/>

    </>
  )
}

export default SalesForcasting