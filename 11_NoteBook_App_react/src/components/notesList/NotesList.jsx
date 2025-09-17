import './NotesList.css'
import { useState, useContext } from 'react';
import { NoteContext } from '../dataContext/NoteContext';
import AddNoteModal from '../modal/AddNoteModal';

const NotesList=({isModalOpen, setModal})=>{
    const {deleteNote, notes} = useContext(NoteContext);
    const [search, setSearch]= useState(""); // state handle the search, okay!

    const filteredNotes = notes.filter((note)=>
    note.title.trim().toLowerCase().includes(search.toLowerCase())||
    note.description.trim().toLowerCase().includes(search.toLowerCase())
);
    return(
        <div className='noteSearch'>
            <h1>My Notes</h1>
            <span>Total Notes: {notes.length}</span>
            <span>Showing :{filteredNotes.length}</span>
            <input 
                type="text"
                placeholder='search notes...'
                value={search} 
                onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="open-btn" onClick={() => setModal(true)}>
                Add Note
            </button>
            {isModalOpen && <AddNoteModal onClose={() => setModal(false)} />}
            {notes.length>0 ? <div className='renderList'>
                {filteredNotes.map((note)=>(
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        <button onClick={()=>deleteNote(note.id)}>Delete</button>
                    </li>
                ))}
            </div>:<p className='noNotes'>No Notes to Show!</p>}
        </div>
    )
}

export default NotesList;