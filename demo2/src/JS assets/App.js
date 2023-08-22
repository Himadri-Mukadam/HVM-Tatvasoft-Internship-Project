import book_img from '../Img assets/book_logo_2.jpg';
import '../CSS assets/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={book_img} className="App-logo" alt="logo" />
        <p>
          Welcome to the World Of Books!
        </p>
      </header>
    </div>
  );
}

export default App;
