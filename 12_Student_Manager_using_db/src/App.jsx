import { useState } from 'react'
import StudentList from './components/StudentList';



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <StudentList modalStatus={isModalOpen} setModal={setIsModalOpen}/>
    </div>
  )
}

export default App
