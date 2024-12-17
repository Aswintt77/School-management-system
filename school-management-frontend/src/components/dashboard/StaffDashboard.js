import React from 'react'
import StudentTable from '../tables/studentTable'
import FeeTAble from '../tables/feeTable'
import LibraryTable from '../tables/libraryTable'
import AppHeader from "../AppHeader"
const Page=()=>{

    return (
    <>
     <AppHeader/>
        <h2 style={{textAlign:"center"}}>Staff dashboard</h2>

          <StudentTable/>
          <FeeTAble/>
          <LibraryTable/>
          </>       
    )
}
export default Page