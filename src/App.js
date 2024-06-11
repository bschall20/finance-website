import React from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
} from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import FinanceManagement from "./pages/FinanceManagement.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Account from "./pages/Account.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignOut from "./pages/SignOut.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./index.css";

function App() {
  return (<div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/financemanagement' element={<FinanceManagement />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/account' element={<Account />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signout' element={<SignOut />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
