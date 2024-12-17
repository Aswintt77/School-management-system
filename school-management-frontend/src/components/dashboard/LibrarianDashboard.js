import StudentTable from "../tables/studentTable"
import LibraryTable from "../tables/libraryTable"
import AppHeader from "../AppHeader"
const Page=()=>{

    return (
        <>
         <AppHeader/>
        <h2 style={{textAlign:"center"}}>Librarian dashboard</h2>
        <StudentTable/>
        <LibraryTable/>
        </>
        


    )
}
export default Page