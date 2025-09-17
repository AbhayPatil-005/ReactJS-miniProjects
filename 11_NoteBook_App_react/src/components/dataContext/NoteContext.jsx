// In this context api, we are fetching the data from the db!
import { createContext, useState, useEffect } from "react";

const BASE_URL = 'https://react-project-fd0a2-default-rtdb.firebaseio.com/' ;

export const NoteContext = createContext({
    notes:[],
    addNotes: ()=>{},
    deleteNotes: ()=>{},
});

const NoteContextProvider =({children})=>{
    const [notes, setNotes]=useState([]);

    useEffect(() => {       // So here is the data fetching thing 
        const fetchNotes = async () => {
            try{
                const res = await fetch(`${BASE_URL}/notes.json`);
                const data = await res.json();

                let loadedNotes = [];
                for(const key in data){
                    loadedNotes.push({
                        id:key,
                        title:data[key].title,
                        description:data[key].description,
                    })
                }
                setNotes(loadedNotes);
            }catch(err){
                console.log("failed to fetch notes: ", err);
            }
        }
        fetchNotes();
    }, [])


    const addNote = async(note)=>{
        try{const res  = await fetch(`${BASE_URL}/notes.json`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(note),
        })
        const data = await res.json();
        setNotes((prev)=>[...prev,{id: data.name, ...note }])
        }catch(err){
            console.log('Failed to add note: ', err);
        }
    }

    const deleteNote=async(id)=>{
        console.log(id)
        try{
            await fetch(`${BASE_URL}/notes/${id}.json`,{
                method:'DELETE',
            });
            setNotes((prev)=>prev.filter((note)=>note.id !== id))
        }catch(err){
            console.log('Failed to delete note: ', err);
        }
    }
    const contextValue ={
        notes,
        addNote,
        deleteNote,
    }

    return <NoteContext.Provider value={contextValue}>
        {children}
    </NoteContext.Provider>
}
export default NoteContextProvider