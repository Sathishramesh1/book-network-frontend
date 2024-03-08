import React, { useContext, useEffect, useState } from 'react'

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BookContext } from '../Context/ContextProvider';
import { Card } from 'react-bootstrap';
import Navbar from '../assets/Components/Navbar';

function Home() {

const {state,dispatch}=useContext(BookContext);

const [book,setBook]=useState({
    title:'',
    author:'',
    ISBN:'',
    description:''
});

const [allbook,setAllbook]=useState('');


const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const response=await axios.post('https://book-network-3zpo.onrender.com/api/register',book);
        setBook({ title:'',
        author:'',
        ISBN:'',
        description:''})
        console.log(response);
        
    } catch (error) {
        console.log(error);
        
    }

}



useEffect(() => {

    const fetchData=async()=>{
        try {
            const data=state.credentialResponseDecoded
            const response =await axios.post('https://book-network-3zpo.onrender.com/api/login',data);
            console.log(response);
        } catch (error) {
            console.log(error);
            
        }
    }
  
fetchData();
  
}, []);



useEffect(()=>{


const fetchBook=async()=>{
    try {
        const response=await axios.get('https://book-network-3zpo.onrender.com/api/getall');
        setAllbook([...response.data.message]);
        
    } catch (error) {
        console.log(error);
    }
}
fetchBook();

},[])


//
useEffect(()=>{
    const fetchfav=async()=>{
        try {
            const response=await axios.get('https://book-network-3zpo.onrender.com/api/getfav',{
                params:{
                    query:state.credentialResponseDecoded.email
                },

            });
        console.log("person",response.data.message)
        dispatch({type:'GETFAV',payload:response.data.message});
        console.log(state.favorites)
            
        } catch (error) {
            console.log(error);
        }
    }
    
    fetchfav();
    
    },[])
    


const handleAdd=async(id)=>{
    try {
        
        const response=await axios.post('https://book-network-3zpo.onrender.com/api/favorites',
        {email:state.credentialResponseDecoded.email,_id:id});
        
        
    } catch (error) {
        console.log(error);
        alert(error.response.data.error)
        
    }
}


  return (
    <div>
    <Navbar/>


    
<Modal show={state?.showForm}  aria-labelledby="contained-modal-title-vcenter"
      centered 
      onHide={()=>dispatch({type:'TOGGLE'})}>
        <Modal.Header closeButton>
          <Modal.Title>Add a NEW BOOK </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className=' container col-12 '>
    <div className="mb-3 ">
  <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="title"
  name="title"
  value={book.title}
  onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })}


  />
</div>
<div className="mb-3 ">
  <label htmlFor="exampleFormControlInput1" className="form-label">Author</label>
  <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Author"
  name="author"
 value={book.author}
  onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })}


  />
</div>
<div className="mb-3 ">
  <label htmlFor="exampleFormControlInput1" className="form-label">ISBN</label>
  <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="ISBN"
  name="ISBN"
   value={book.ISBN}
  onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })}
  />
</div>
<div className="mb-3 ">
  <label htmlFor="exampleFormControlInput1" className="form-label">description</label>
  <input type="text" className="form-control" id="exampleFormControlInput3" placeholder="description"
  name="description"
   value={book.description}
  onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })}
  />
</div>
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>dispatch({type:'TOGGLE'})}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>
         { 
          dispatch({type:'TOGGLE'});
          handleSubmit();
          
          }}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>

      <div className='container d-flex flex-row flex-wrap gap-4'>
{allbook&&allbook.map((ele)=>{
    return (
       
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://img.freepik.com/free-psd/book-hardcover-mockup_125540-225.jpg?w=826&t=st=1709912178~exp=1709912778~hmac=2c5341a8ea5951d843243fac894af4d0a4e054073ba16835005435076b61fb91" />
      <Card.Body>
        <Card.Title>{ele.title}</Card.Title>
        <Card.Text>
         Author:{ele.author}
        </Card.Text>
        
        <Button variant="primary" onClick={()=>handleAdd(ele._id)}>Add to Personal</Button>
      </Card.Body>
    </Card>
  );

})}
</div>

    </div>
  )
}

export default Home