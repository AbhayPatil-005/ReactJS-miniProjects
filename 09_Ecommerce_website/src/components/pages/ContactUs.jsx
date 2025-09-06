import NavBar from "../navBar/NavBar";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";

export const ContactUs=()=>{
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        phoneNo:"",
    })
    const eventInputChange =(e)=>{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
    };
    const eventFormHandler =async(e)=>{
        e.preventDefault();
        console.log("Form Submitted", formData)
        try {const response = await fetch(`https://e-commerce-website-98670-default-rtdb.firebaseio.com/contactData.json`,
            {
                method: "Post",
                body: JSON.stringify(formData),
                headers:{
                    'Content-Type':'application/json'
                }
        })
        const data = await response.json();
        setFormData({
            name: "",
            email: "",
            phoneNo: "",
            });
    }catch{
        console.error("Failed to upload data")
    }
    }
    return (
        <>
            <NavBar/>
            <h2 className="mb-4  py-2 text-center">Contact Us</h2>
            <Container className="d-flex justify-content-center align-items-center">
                
                <Form onSubmit={eventFormHandler} className=" p-3 border 2px rounded d-inline-block " >
                <Form.Group className="mb-3 " controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={eventInputChange}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3 " controlId="formEmail">
                    <Form.Label >Email Id</Form.Label>
                    <Form.Control 
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={eventInputChange}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhoneNo">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={eventInputChange}
                    required
                    />
                </Form.Group>

                <div className="py-3">
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
                </Form>
            </Container>
        </>
    )
}