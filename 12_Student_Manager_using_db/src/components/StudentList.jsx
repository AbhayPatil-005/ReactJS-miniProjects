import "./StudentList.css";
import { StudentContext } from "./StudentContext/StudentContext";
import { useContext, useState } from "react";
import AddStudentModal from "./modals/AddStudentModal";



const StudentList=({modalStatus, setModal})=>{
    const{students, editStudent, deleteStudent} = useContext(StudentContext);
    const[editMode, setEditMode] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    const openAddModal = () => {
        setEditMode(false);
        setCurrentStudent(null);
        setModal(true);
    };
    const openEditModal = (student) => {
        setEditMode(true);
        setCurrentStudent(student);
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
        setEditMode(false);
        setCurrentStudent(null);
    };

    return(<div className="rendering-students">
        <section className="student-header">
            <h1>Students Managing App</h1>
            <h3>Total Students: <span>{students.length}</span></h3>
            <button onClick={openAddModal}>Add New Student</button> 
        </section>
        {modalStatus && <AddStudentModal onClose={closeModal}
          editMode={editMode}
          setEditMode={setEditMode}
          editStudent={editStudent}       
          student={currentStudent}/>}

        {students.length > 0 ? (
            <ul className="student-renderlist">
                {students.map((stu) => (
                    <li key={stu.id}>
                        <p>Name: {stu.name}</p>
                        <p>Phone Number: {stu.number}</p>
                        <p>Address: {stu.address}</p>

                        <div className="renderlist-btn">
                            <button onClick={() => openEditModal(stu)}>Edit</button>
                            <button onClick={() => deleteStudent(stu.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="noStudents">No students found</p>
        )}
    </div>)
}

export default StudentList;