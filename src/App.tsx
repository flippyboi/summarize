/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { HomePage } from './components/HomePage/HomePage';

import Content from './components/Layout/Content/Content';
import Header from './components/Layout/Header/Header';
import { PromptForm } from './components/PromptForm/PromptForm';
import { useAuth } from './hooks/useAuth';
import { useAuthStore } from './zustand/store';

import './App.css';

function App() {
    const { setUser, isAuth } = useAuthStore();
    const { getUser } = useAuth();

    React.useEffect(() => {
        setUser(getUser());
    }, []);

    return (
        <div className="app" style={{ height: `${window.innerHeight}px` }}>
            <Header />
            <Content>{isAuth ? <PromptForm /> : <HomePage />}</Content>
        </div>
    );
}

export default App;
