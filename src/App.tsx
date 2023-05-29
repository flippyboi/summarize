import React from 'react';

import { HomePage } from './components/HomePage/HomePage';

import Content from './components/Layout/Content/Content';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import { PromptForm } from './components/PromptForm/PromptForm';
import { useAuth } from './hooks/useAuth';
//import { supabase } from './hooks/useSupabase';
import { useAuthStore } from './zustand/store';

import './App.css';

function App() {
    const { setUser, isAuth } = useAuthStore();
    const { getUser } = useAuth();

    React.useEffect(() => {
        setUser(getUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app" style={{ height: `${window.innerHeight}px` }}>
            <Header />
            <Content>{isAuth ? <PromptForm /> : <HomePage />}</Content>
        </div>
    );
}

export default App;
