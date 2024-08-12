import AboutUs from './About/About';
import Admin from './Admin/Admin';
import Categoriesmain from './Admin/Categoriesmain';
import './App.css';
import Chapter from './Chapter/Chapter';
import ArtAdd from './Course+/ArtAdd';
import Coursedash from './Course+/Coursedash';
import EngineAdd from './Course+/EngineAdd';
import MedAdd from './Course+/MedAdd';

import Enrollment from './Enroll/Enrollment';
import FeedbackForm from './Feedback/Feedback';
import Art from './Gridpages/Art';
import Engineer from './Gridpages/Engineer';

import Grid from './Gridpages/Grid';

import Med from './Gridpages/Med';

import Landing from './Landing/Landing';

import Offer from './OfferPage/Offer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Login/SignUp';

import Descriptioncombine from './Admin/Descriptioncombine';
import Chapform from './Admin/Chapform';
import Chapcombine from './Admin/Chapcombine';
import Chapter1 from './Chapter/Chapter1';
import Chapter2 from './Chapter/Chapter2';
import UserProfile from './Login/Profile';
import Profile from './Login/Profile';
import EmbeddedWebsite from './compiler/EmbeddedWebsite';
import PaymentPage from './Enroll/PaymentPage';


function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Payment" element={<PaymentPage />} />
          <Route path="/EmbeddedWebsite" element={<EmbeddedWebsite />} />
          <Route path="/Grid" element={<Grid />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/enroll" element={<Enrollment />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/grid" element={<Grid />} />
          <Route path="/Chapter" element={<Chapter />} />
          <Route path="/Chapter1" element={<Chapter1 />} />
          <Route path="/Chapter2" element={<Chapter2/>} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/categories" element={<Categoriesmain/>} />
          <Route path="/course" element={<Coursedash/>} />
          <Route path="/description" element={<Descriptioncombine/>} />
          <Route path="/vedio" element={<Chapcombine/>} />
          <Route path="/Medical" element={<Med/>} />
          <Route path="/Artsss" element={<Art/>} />
          <Route path="/engine" element={<Engineer/>} />
          <Route path="/EngineAdd" element={<EngineAdd/>} />
          <Route path="/ArtAdd" element={<ArtAdd/>} />
          <Route path="/MedAdd" element={<MedAdd/>}/>
          <Route path="/Feed" element={<FeedbackForm/>} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
