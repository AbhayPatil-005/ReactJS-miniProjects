import { createContext, useState, useEffect } from "react";

const BASE_URL = 'https://react-project-fd0a2-default-rtdb.firebaseio.com/';

export const StudentContext = createContext({
    students:[],
    addStudent:()=>{},
    editStudent:()=>{},
    deleteStudent:()=>{},
})

const StudentContextProvider=({children})=>{
    const [students, setStudents] = useState([]);

    useEffect(() => {     
        const fetchStudents = async () => {
            try{
                const res = await fetch(`${BASE_URL}/students.json`);
                const data = await res.json();

                let loadedStudents = [];
                for(const key in data){
                    loadedStudents.push({
                        id:key,
                        name:data[key].name,
                        number:data[key].number,
                        address:data[key].address,
                    })
                }
                setStudents(loadedStudents);
            }catch(err){
                console.log("failed to fetch Student: ", err);
            }
        }
        fetchStudents();
    }, [])

    const addStudent = async(student)=>{
        try{const res  = await fetch(`${BASE_URL}/students.json`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(student),
        })
        const data = await res.json();
        setStudents((prev)=>[...prev,{id: data.name, ...student }])
        }catch(err){
            console.log('Failed to add Student: ', err);
        }
    }

    const deleteStudent=async(id)=>{
        console.log(id)
        try{
            await fetch(`${BASE_URL}/students/${id}.json`,{
                method:'DELETE',
            });
            setStudents((prev)=>prev.filter((student)=>student.id !== id))
            console.log("success deleteStudent")
        }catch(err){
            console.log('Failed to delete Student: ', err);
        }
    }

    const editStudent = async (id, updatedStudent) => {
        try {
            const res = await fetch(`${BASE_URL}/students/${id}.json`, {
                method: "PUT", 
                body: JSON.stringify(updatedStudent),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to update student");
            }

            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === id ? { ...student, ...updatedStudent } : student
                )
            );
        } catch (err) {
            console.error("Error editing student:", err);
        }
    };

    const contextValue = {
        students,
        addStudent,
        editStudent,
        deleteStudent,
    }

    return <StudentContext.Provider value={contextValue}>
        {children}
    </StudentContext.Provider>

}

export default StudentContextProvider;