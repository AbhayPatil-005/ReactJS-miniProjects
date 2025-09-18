
import { createPortal } from "react-dom";
import { useState, useContext, useEffect } from "react";
import { StudentContext } from "../StudentContext/StudentContext";
import'./AddStudentModal.css';

const AddStudentModal=({onClose, editMode, setEditMode, editStudent, student})=>{
    const {addStudent}=useContext(StudentContext)
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (editMode && student) {
            setName(student.name || "");
            setNumber(student.number || "");
            setAddress(student.address || "");
        } else {
            setName("");
            setNumber("");
            setAddress("");
        }
    }, [editMode, student]);

    const saveHandler=async()=>{
        if (!name.trim() || !number.trim() || !address.trim()) {
            alert("All fields are required!");
            return;
        }
        const studentData = {
            name: name.trim(),
            number: number.trim(),
            address: address.trim(),
        };
        if(editMode && student){
            await editStudent(student.id, studentData);
        } else {
            await addStudent(studentData);
        }
        setEditMode(false); 
        onClose();          
        setName("");
        setNumber("");
        setAddress("");
    }
    const cancelHandler = () => {
        setEditMode(false); 
        onClose();
    };
    return createPortal(<div className="modal-overlay">
        <div className="modal-content">
            <h2>Add Student</h2>
            <div><label htmlFor="name">Name: </label>
            <input type="text" id="name" value={name} required onChange={(e)=>setName(e.target.value)}/></div>

            <div><label htmlFor="number">Phone Number: </label>
            <input type="tel" id="number" value={number} required onChange={(e)=>setNumber(e.target.value)}/></div>
            
            <div><label htmlFor="address">Address: </label>
            <input type="text" id="address" value={address} required onChange={(e)=>setAddress(e.target.value)} /></div>
        
        <div className="modal-actions">
            <button className="btn-cancel" onClick={cancelHandler}>Cancel</button> 
            <button className="btn-add" onClick={()=>{saveHandler()}}>{editMode ? "Update" : "Add"}</button>
        </div>
        </div>
    </div>,document.getElementById('root-modal'))

}

export default AddStudentModal;