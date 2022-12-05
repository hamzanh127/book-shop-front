import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticatedRoute from "./component/authenticated";
import Home from "./component/home";
import ListAdmin from "./component/listAdmin";
import Login from "./component/login/login";
import Navbar from "./component/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
           <Route path="/" element={<AuthenticatedRoute/>}>
            <Route path="/listbook" element={<ListAdmin/>}/>
            <Route path="/newbook"/>
           </Route>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
