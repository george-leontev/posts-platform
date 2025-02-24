import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { SighInPage } from './pages/sign-in-page';
import { PostsPage } from './pages/posts-page';
import { AppDataContextProvider } from './contexts/app-data-context';
import { AuthProvider, useAuth } from './contexts/app-auth-context';
import { AppSharedContextProvider, useAppSharedContext } from './contexts/app-shared-context';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        text: {
            primary: '#171717',
        },
        primary: {
            main: '#171717',
        },
        background: {
            default: '#f4f6f8',
            paper: 'white',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: '#f3f3f3',
        },
        primary: {
            main: '#f3f3f3',
        },
        background: {
            default: '#121212',
            paper: '#212121',
        },
    },
});
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated() ? <>{children}</> : <Navigate to="/sign-in" />;
};

const App = () => {
    const { isDarkMode } = useAppSharedContext();

    return (
        <Router>
            <AuthProvider>
                <AppDataContextProvider>
                    <AppSharedContextProvider>
                        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                            <Routes>
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/sign-in" element={<SighInPage />} />
                                <Route
                                    path="/posts"
                                    element={
                                        <ProtectedRoute>
                                            <PostsPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route path="/" element={<Navigate to="/home" />} />
                            </Routes>
                        </ThemeProvider>
                    </AppSharedContextProvider>
                </AppDataContextProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
