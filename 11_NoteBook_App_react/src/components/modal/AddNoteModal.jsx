
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { NoteContext } from "../dataContext/NoteContext";
import './AddNoteModal.css'

const AddNoteModal = ({onClose})=>{
  const {addNote, deleteNote, notes} = useContext(NoteContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async() => {

    if(!title.trim())return;
    const newNote ={
      title: title,
      description: description,
    }
    await addNote(newNote)
    console.log("Note Saved!");
    onClose(false);
    setTitle("");
    setDescription(""); 
  };
    
    return createPortal(
    <div className="modal-overlay" onClick={()=>onClose(false)}>
      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
        <h2>Add Note</h2>
        <input type="text" placeholder="Enter note title..." onChange={(e)=>setTitle(e.target.value)}/>
        <textarea placeholder="Enter note details..." onChange={(e)=>setDescription(e.target.value)}></textarea>

        <div className="modal-actions">
          <button className="btn cancel" onClick={()=>onClose(false)}>
            Cancel
          </button>
          <button className="btn save" onClick={()=>handleSave()}>Add</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") 
  );
}

export default AddNoteModal;