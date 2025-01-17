import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/app-auth-context';
import { SignInModel } from '../models/signin-model';

export const SighInPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const signInHandler = useCallback(async () => {
        const signInUser: SignInModel = {
            email,
            password,
        }

        await signIn(signInUser);

        await navigate('/posts');
    }, [signIn, email, password, navigate]);

    return (
        <div className="flex min-h-screen">
            <div className="w-3/5 bg-white flex flex-col items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6 w-full max-w-xl bg-gray-100 p-6 rounded-lg"
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Sign In
                    </Typography>
                    <div className="flex flex-col gap-6">
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-2"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-2"
                        />

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className='w-full h-12' variant="contained" color="primary" type="submit" onClick={signInHandler}>
                                Sign In
                            </Button>
                        </motion.div>

                    </div>
                </motion.div>
            </div>

            <div className="w-2/5 bg-[#161616] flex items-center justify-center text-white p-8 rounded-l-[58px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4 text-center"
                >
                    <Typography variant="h3" className="font-bold mb-4">
                        Sign In now to start a new social story.
                    </Typography>
                    <Typography variant="h6">
                        Don't forget to give the developer some cookies
                    </Typography>
                </motion.div>
            </div>
        </div>
    );
};