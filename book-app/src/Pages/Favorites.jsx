import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../assets/Components/Navbar'
import axios from 'axios'
import { BookContext } from '../Context/ContextProvider'
import { Button, Card } from 'react-bootstrap';

function Favorites() {

const {state}=useContext(BookContext);
const [user,setUser]=useState('');

useEffect(()=>{

const fetchData=async()=>{
    try {
       const email=state.credentialResponseDecoded.email
       console.log(email);
        const response= await axios.get('https://book-network-3zpo.onrender.com/api/getfav',{
            params:{
                query:email
            }
        });
        console.log(response);
        setUser([...response.data.message])
        
    } catch (error) {
        console.log(error);
    }
}

fetchData();


},[]);



const handleAdd=async(id)=>{
    try {
        console.log(id);
        
        const response=await axios.post('https://book-network-3zpo.onrender.com/api/favorites',
        {email:state.credentialResponseDecoded.email,_id:id});
        console.log(response)
        
    } catch (error) {
        console.log(error);
        alert(error.response.data.error)
        
    }
}

  return (
    <div>
       <Navbar/>
       

<h1 className='text-align-center'>my favorites</h1>
        <div className='container d-flex flex-row gap-4 flex-wrap'>
    {user&&user.map((ele)=>{
        return (
       
       <Card style={{ width: '18rem' }} key={ele._id}>
         <Card.Img variant="top" src="https://img.freepik.com/free-psd/book-hardcover-mockup_125540-225.jpg?w=826&t=st=1709912178~exp=1709912778~hmac=2c5341a8ea5951d843243fac894af4d0a4e054073ba16835005435076b61fb91" />
         <Card.Body>
           <Card.Title>{ele.title}</Card.Title>
           <Card.Text>
            Author:{ele.author}
           </Card.Text>
           {console.log(ele)}
           <Button variant="primary" onClick={()=>handleAdd(ele._id)}>Add to Personal</Button>
         </Card.Body>
       </Card>
     );
    })}
    </div>
 
       



    </div>
  )
}

export default Favorites