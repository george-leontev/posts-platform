import { motion } from 'framer-motion';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/app-auth-context';

export const HomePage = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center bg-[#161616] min-h-screen text-white">
            <motion.div
                initial={ { opacity: 0, y: -50 } }
                animate={ { opacity: 1, y: 0 } }
                exit={ { opacity: 0, y: 50 } }
                transition={ { duration: 0.5 } }
                className="flex flex-col gap-6 text-center"
            >
                <Typography variant="h1" component="h1" className="font-bold mb-4">
                    Welcome to posting platform
                </Typography>
                <Typography variant="h6" className="mb-8">
                    Press button to start and make your first post!
                </Typography>
                <Link to={ user ? '/posts' : '/sign-in' }>
                    <motion.div whileHover={ { scale: 1.05 } } whileTap={ { scale: 0.95 } }>
                        <Button sx={ { width: '140px' } } variant="outlined" color="inherit">
                            { user ? 'Get started' : 'Sign in' }
                        </Button>
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    );
};