/*You need to pass the modal state from a parent component or use a global state. Here's the simplest way:

Option 1: Pass modal control via Context (Recommended)
Create an Auth Context to control the modal from anywhere. */

import React, { createContext, useState, useContext } from 'react';

const AuthModalContext = createContext();

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error('useAuthModal must be used within AuthModalProvider');
    }
    return context;
};

export const AuthModalProvider = ({ children }) => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authType, setAuthType] = useState('login');
    const [redirectUrl, setRedirectUrl] = useState(null);

    const openAuthModal = (type = 'login', redirect = null) => {
        setAuthType(type);
        setRedirectUrl(redirect);
        setShowAuthModal(true);
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
        setRedirectUrl(null);
    };

    return (
        <AuthModalContext.Provider value={{
            showAuthModal,
            authType,
            redirectUrl,
            openAuthModal,
            closeAuthModal,
            setAuthType
        }}>
            {children}
        </AuthModalContext.Provider>
    );
};