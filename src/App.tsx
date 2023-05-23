import React from 'react';

import { HomePage } from './components/HomePage/HomePage';

import Content from './components/Layout/Content/Content';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import { PromtForm } from './components/PromtForm/PromtForm';
import { useAuth } from './hooks/useAuth';
//import { supabase } from './hooks/useSupabase';
import { useAuthStore } from './zustand/store';

function App() {
    const { setUser, isAuth } = useAuthStore();
    const { getUser } = useAuth();

    console.log(isAuth);

    React.useEffect(() => {
        setUser(getUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app">
            <Header />
            <Content>{isAuth ? <PromtForm /> : <HomePage />}</Content>
            <Footer />
        </div>
    );
}

export default App;
