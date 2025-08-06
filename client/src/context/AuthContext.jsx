import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoadUserQuery } from '../features/api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isError } = useLoadUserQuery();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    } else if (isError) {
      setUser(null);
    }
  }, [data, isError]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    role: user?.role || null,
    instructorStatus: user?.instructorStatus || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
