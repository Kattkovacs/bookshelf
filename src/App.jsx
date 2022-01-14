import './App.css';
import { InputGroup, Input, Button } from 'reactstrap';

function App() {
  const mainImage = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>
        {/* Overlay */}
        <h1 className='display-2 text-center text-white mb-3' >
          Online Bookshelf
        </h1>
        <div style={{ width: '60%' }}>
          <InputGroup className='mb-3' size='lg'>
            <Input placeholder='Book search' />
            <Button color='secondary'>
              <i className='fas fa-search'></i>
            </Button>
          </InputGroup>
        </div>
      </div>
    )
  }
  return (
    <div>
      {mainImage()}
    </div>
  );
}

export default App;
