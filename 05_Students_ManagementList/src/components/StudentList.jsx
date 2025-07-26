const StudentList = ({ students, onLoad, onEdit }) => {
  const handleDelete = (id) => {
    localStorage.removeItem(id);
    onLoad();
  };

  return (
    <div>
      {students.map((student) => (
        <div key={student.id}>
        {`${student.name} ${student.mobile} ${student.address} `}
          <button onClick={() => handleDelete(student.id)}> Delete </button>
          <button onClick={() => onEdit(student)}> Edit </button>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
