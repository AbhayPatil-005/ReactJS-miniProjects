import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  const loadStudents = () => {
    const loaded = Object.values(localStorage).map((item) =>
      JSON.parse(item)
    );
    setStudents(loaded);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <>
      <h1>Student Manager</h1>
      <p>All Students: {students.length}</p>
      <StudentForm onLoad={loadStudents} editStudent={editStudent} />
      <h2>All students</h2>
      <StudentList
        students={students}
        onLoad={loadStudents}
        onEdit={setEditStudent}
      />
    </>
  );
}

export default App;