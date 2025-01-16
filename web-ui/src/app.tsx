import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConstructorPage } from './pages/constructor-page';
import { HomePage } from './pages/home-page';
import { SighInPage } from './pages/sign-in-page';
import { PostsPage } from './pages/posts-page';
import { AppDataContextProvider } from './context/app-data-context';

const App = () => {
  return (
    <Router>
      <AppDataContextProvider>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/sign-in" element={<SighInPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/constructor" element={<ConstructorPage />} />
        </Routes>
      </AppDataContextProvider>
    </Router>

  );
};

export default App;