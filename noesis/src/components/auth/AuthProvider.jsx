import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((data) => {
            setUser(data); 
            setLoading(false);
        });
    }, []);


    const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

