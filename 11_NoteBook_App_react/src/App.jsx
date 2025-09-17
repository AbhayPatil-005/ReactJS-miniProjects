import { useState } from "react";
import NotesList from "./components/notesList/NotesList";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <NotesList isModalOpen={isModalOpen} setModal={setIsModalOpen}/>
      
    </>
  )
}

export default App
