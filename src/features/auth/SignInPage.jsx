// src/features/auth/SignInPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signInAnonymously, signInWithCustomToken } from 'firebase/auth';

const SignInPage = ({ onSignInSuccess, auth, db, initialAuthToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        if (!auth) {
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                onSignInSuccess(db, auth, user.uid);
            } else {
                if (!initialAuthToken) {
                    try {
                        await signInAnonymously(auth);
                    } catch (anonymousError) {
                        console.error("Anonymous sign-in failed:", anonymousError);
                        setError("Failed to initialize session. Please try again.");
                    }
                }
            }
            setAuthReady(true);
        });

        const signInWithToken = async () => {
            if (initialAuthToken && !auth.currentUser) {
                try {
                    await signInWithCustomToken(auth, initialAuthToken);
                } catch (tokenError) {
                    console.error("Custom token sign-in failed:", tokenError);
                    setError("Session expired or invalid. Please sign in.");
                    setAuthReady(true);
                }
            }
        };

        signInWithToken();

        return () => unsubscribe();
    }, [auth, initialAuthToken, onSignInSuccess, db]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error("Login error:", err.code, err.message);
            if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid User ID or Password.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed login attempts. Please try again later.');
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!authReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-xl">Loading authentication...</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md text-white">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-yellow-400 mb-2">EMTECH</h1>
                    <h2 className="text-xl font-semibold text-gray-300">Beyond Compliance Access</h2>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-4">Welcome</h3>
                    <p className="text-sm text-gray-400 mb-6">Sign in to your account or create a new one</p>

                    <div className="flex border-b border-gray-700 mb-6">
                        <button className="flex-1 py-2 text-center text-yellow-400 border-b-2 border-yellow-400 font-medium">
                            Sign In
                        </button>
                        <button className="flex-1 py-2 text-center text-gray-400 hover:text-white transition-colors">
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm mt-2">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;