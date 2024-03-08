import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookContext } from '../../Context/ContextProvider';


function Navbar({handleLogoutSuccess}) {
  const navigate=useNavigate();

  const {state,dispatch}=useContext(BookContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


const fetchUser=async(e)=>{
  e.preventDefault();
  try {
    
    const response=await axios.get('https://book-network-3zpo.onrender.com/api/search',{
      params:{
        query:searchQuery
      }
    });

    console.log(response);
    dispatch({type:'USERFAV',payload:response.data.users});
    setSearchResults(response.data.users); 
  } catch (error) {
    console.log(error);
  }
}


const handleModel=()=>{

    dispatch({type:'TOGGLE'})

}


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid vw-100">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link" onClick={handleModel}>ADD Books</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/fav">Favorites Books</Link>
        </li>
              </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search users" placeholder="Search" aria-label="Search"

         value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
        />
        
        <button className="btn btn-outline-success" type="click" onClick={fetchUser}>Search</button>
        <button onClick={()=>{
          handleLogoutSuccess();
          navigate('/');
       
        }}>Logout</button>
      </form>
      
      

      
    </div>
   
  </div>

</nav>
<ul className="list-group">
  {searchResults.length > 0 && (
    searchResults.map((user) => (
      <li className="list-group-item" key={user.id} onClick={()=>navigate(`/${user.email}`)}>
        <strong>{user.username}</strong> - {user.email}
      </li>
    ))
  )}
</ul>


    </>
  )
}

export default Navbar