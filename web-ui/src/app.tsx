import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PostPage } from './pages/post-page.tsx';
import { HomePage } from './pages/home-page.tsx';
import { SighInPage } from './pages/sign-in-page.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<SighInPage />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;