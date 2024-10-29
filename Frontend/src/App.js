import React from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
} from "react-router-dom";
import { useCookies } from "react-cookie"
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import FinanceManagement from "./pages/FinanceManagement.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Account from "./pages/Account.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignOut from "./pages/SignOut.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/Footer.jsx"
import "./index.css";

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  //const userEmail = cookies.Email // set this in the financemanagement page? to getData @ ${userEmail}
  // const authToken = false;

  
  return (<div className="app">
    {authToken && 
      <Router>
        <Navbar signedIn={true}/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/financemanagement' element={<FinanceManagement />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/account' element={<Account />} />
          <Route exact path='/signout' element={<SignOut />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>}

      {!authToken && <Router>
        <Navbar signedIn={false}/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>}
    </div>
  );
}

export default App;
