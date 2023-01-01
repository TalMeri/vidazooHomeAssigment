import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";


const AppRouter = () => {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route exact path="/"  element={<Home />}/>
        </Routes>
      </Router>
  );
};

export default AppRouter;
