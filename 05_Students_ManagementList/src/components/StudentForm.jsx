import { useEffect, useState } from "react";

const StudentForm = ({ onLoad, editStudent }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setMobile(editStudent.mobile);
      setAddress(editStudent.address);
    }
  }, [editStudent]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !mobile.trim() || !address.trim()) {
    alert("Please fill out all fields.");
    return;
  }
  
    const id = editStudent?.id || Date.now();
    const student = { id, name, mobile, address };

    localStorage.setItem(id, JSON.stringify(student));
    onLoad();
    setName("");
    setMobile("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input value={name} id="name" onChange={(event) => setName(event.target.value)} />

      <label htmlFor="mobile">Mobile:</label>
      <input value={mobile} id="mobile" onChange={(event) => setMobile(event.target.value)} />

      <label htmlFor="address">Address:</label>
      <input value={address} id="address" onChange={(event) => setAddress(event.target.value)} />

      <button type="submit">{editStudent ? "Update" : "Add"}</button>
    </form>
  );
};

export default StudentForm;
