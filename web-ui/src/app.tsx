import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ConstructorPage } from './pages/constructor-page';
import { HomePage } from './pages/home-page';
import { SighInPage } from './pages/sign-in-page';
import { PostsPage } from './pages/posts-page';
import { AppDataContextProvider } from './contexts/app-data-context';
import { AuthProvider, useAuth } from './contexts/app-auth-context';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated } = useAuth();
  return true ? <>{children}</> : <Navigate to="/sign-in" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppDataContextProvider>

          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/sign-in" element={<SighInPage />} />
            <Route path="/posts" element={

                <PostsPage />
          
            } />
            <Route path="/constructor" element={<ConstructorPage />} />

            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>

        </AppDataContextProvider>
      </AuthProvider>
    </Router>

  );
};

export default App;