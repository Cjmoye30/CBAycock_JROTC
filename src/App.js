import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Pages
import Home from './pages/home';
import Events from './pages/events';
import Calendar from './pages/calendar';
import Syllabus from './pages/syllabus';
import ClassInfo from './pages/classInfo';
import ContEducation from './pages/contEducation';

// Import Components
import Header from './components/header';
import Footer from './components/footer';

function App() {

  return (

    <Router>
      <Header />
      <div className="App">
        <Routes>

          {/* <Route path="*" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/syllabus' element={<Syllabus />} />
          <Route path='/classInfo' element={<ClassInfo />} />
          <Route path='/contEducation' element={<ContEducation />} />

        </Routes>

      </div>
      <Footer />
    </Router>
  );
}

export default App;

