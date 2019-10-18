import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = props => {
const [input, setInput] = useState({title: '', director: '', metascore: '', stars: []})

 const movieId = props.match.params.id;
 
const getMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setInput(res.data))
      .catch(err => console.log(err.response));
  };

  
 useEffect(() => {
    getMovie(movieId)
  },[movieId])
 
const handleChange = event => {

 setInput({
 ...input,
 [event.target.name]: event.target.value
 }) 
}

const handleChangeStar = index => event => {
 setInput({
 ...input,
 stars: input.stars.map((star, indexOfStar) => {
  if(indexOfStar === index) {
  return event.target.value
  } else {
 return star   
  }
 })   
 })
}

const submitForm = event => {
    event.preventDefault()
    
 axios
 .put(`http://localhost:5000//api/movies/${movieId}`, input) 
 .then(res => {
 console.log(res.data);
 props.history.push('/');
 }) 
 .catch(err => console.log(err.response))  
}

return (
 <form onSubmit={submitForm}>
 <input 
 type='text'
 name='title'
 value={input.title}
 placeholder='...enter movie title'
 onChange={handleChange}
 />
 <input 
 type='text'
 name='director'
 value={input.director}
 placeholder='...enter director'
 onChange={handleChange}
 />
 <input 
 type='number'
 name='metascore'
 value={input.metascore}
 placeholder='...enter a metascore'
 onChange={handleChange}
 />
 
 {input.stars.map((star, index) => {
  return <input
  type='text'
  value={star}
  placeholder='...enter name of stars'
  onChange={handleChangeStar(index)}
  />
 })}
 <button type='submit'>Submit</button>
 </form>
 )
}
export default MovieForm;