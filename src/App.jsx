import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import NewsLetter from './Pages/NewsLetter';
import { ScrollToTopButton } from './Components/Buttons';

function App() {
  return(
    <>
      <Router basename='/AiCollections/'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newsletter" element={<NewsLetter />} />
        </Routes>
      </Router>
      <ScrollToTopButton />
    </>
  );
}

export default App
