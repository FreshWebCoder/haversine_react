import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

import './App.css';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
