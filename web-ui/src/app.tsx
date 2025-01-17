import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { SighInPage } from './pages/sign-in-page';
import { PostsPage } from './pages/posts-page';
import { AppDataContextProvider } from './contexts/app-data-context';
import { AuthProvider, useAuth } from './contexts/app-auth-context';
import { AppSharedContextProvider } from './contexts/app-shared-context';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated() ? <>{children}</> : <Navigate to="/sign-in" />;
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppDataContextProvider>
                    <AppSharedContextProvider>
                        <Routes>
                            <Route path="/home" element={ <HomePage /> } />
                            <Route path="/sign-in" element={ <SighInPage /> } />
                            <Route path="/posts" element={
                                <ProtectedRoute>
                                    <PostsPage />
                                </ ProtectedRoute>
                            } />

                            <Route path="/" element={ <Navigate to="/sign-in" /> } />
                        </Routes>
                    </AppSharedContextProvider>
                </AppDataContextProvider>
            </AuthProvider>
        </Router>

    );
};

export default App;