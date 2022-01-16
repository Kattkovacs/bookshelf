import React, { useState } from 'react'
import { InputGroup, Input, Button, Spinner } from 'reactstrap'
import BookCard from '../components/BookCard.jsx'
import axios from 'axios'

const MainImage = () => {
    //States
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const baseURL = 'https://www.googleapis.com/books/v1/';
    const maxResults = 40;

    //Handle search
    const handleSubmit = () => {
        setLoading(true);
        axios.get(
            `${baseURL}volumes?q=${query}&maxResults=${maxResults}`
        ).then(res => {
            if (res.data.items.length > 0) {
                setCards(res.data.items);
                setLoading(false);
            }
        }).catch(err => {
            setLoading(true);
            console.log(err);
        });
    }

    const handleCards = () => {
        const items = cards.map(item => {
            let thumbnail = '';
            if (item.volumeInfo.imageLinks.thumbnail) {
                thumbnail = item.volumeInfo.imageLinks.thumbnail;
            }

            return (
                <div className="col-lg-4 mb-3" key={item.id}>
                    <BookCard
                        thumbnail={thumbnail}
                        title={item.volumeInfo.title}
                        pageCount={item.volumeInfo.pageCount}
                        language={item.volumeInfo.language}
                        authors={item.volumeInfo.authors}
                        publisher={item.volumeInfo.publisher}
                        description={item.volumeInfo.description}
                        previewLink={item.volumeInfo.previewLink}
                        infoLink={item.volumeInfo.infoLink}
                    />
                </div>
            )
        })
        
        if (loading) {
            return (
                <div className='d-flex justify-content-center'>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
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
        <div>
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
                </div>
            </div>
            <div>{handleCards()}</div>
        </div>
    )
}

export default MainImage
