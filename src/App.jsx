import React, { useState } from 'react'
import './App.css'
import { InputGroup, Input, Button, FormGroup, Label, Spinner } from 'reactstrap'
import axios from 'axios'
import BookCard from './BookCard.jsx'

function App() {
  //States
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  //Handle search
  const handleSubmit = () => {
    setLoading(true);
    axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    ).then(res => {
      if (res.data.items.length > 0){
        setCards(res.data.items);
        setLoading(false);
      }
    }).catch(err => {
      setLoading(true);
      console.log(err);
    });
  }

  //Main 
  const mainImage = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>
        {/* Overlay */}
        <div className='filter'></div>
        <h1 className='display-2 text-center text-white mb-3' style={{ zIndex: 2 }}>
          Online Bookshelf
        </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup className='mb-3' size='lg'>
            <Input placeholder='Book search' value={query} onChange={e => setQuery(e.target.value)} />
            <Button color='secondary' onClick={handleSubmit}>
              <i className='fas fa-search'></i>
            </Button>
          </InputGroup>
          <div className="d-flex text-white justify-content-center">
            <FormGroup className='ml-5'>
              <Label></Label>
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }

  const handleCards = () => {
    const items = cards.map(item => {
      let thumbnail = '';
      if (item.volumeInfo.imageLinks.thumbnail) {
        thumbnail = item.volumeInfo.imageLinks.thumbnail;
      }

      return(
        <div className="col-lg-4" key={ item.id }>
          <BookCard thumbnail={ thumbnail }/>
        </div>
      )
    })
      if (loading) {
        return (
        <div className='d-flex justify-content-center'>
            <Spinner style={ { width:'3rem', height: '3rem' } }/>
        </div>
        )
      } else {
        return (
          <div className='container my-5'>
            <div className='row'>{items}</div>
          </div>
        )
      }
  }

  return (
    <div className='w-100 h-100'>
      {mainImage()}
      {handleCards()}
    </div>
  );
}

export default App;
