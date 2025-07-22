import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define user types
export type UserType = 'student' | 'educator' | 'admin';

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
}

// Define context interface
interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  login: async () => null,
  logout: () => {},
  isAuthenticated: false
});

// Demo users for authentication
const demoUsers = [
  {
    id: '1',
    email: 'demo.student@tutokitulo.africa',
    password: 'student123',
    name: 'Alex Johnson',
    userType: 'student' as UserType
  },
  {
    id: '2',
    email: 'demo.educator@tutokitulo.africa',
    password: 'educator123',
    name: 'Dr. Sarah Wilson',
    userType: 'educator' as UserType
  },
  {
    id: '3',
    email: 'admin@tutokitulo.africa',
    password: 'admin123',
    name: 'Michael Chen',
    userType: 'admin' as UserType
  }
];

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserType(parsedUser.userType);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<User | null> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = demoUsers.find(
          (u) => u.email === email && u.password === password
        );
        
        if (foundUser) {
          // Create user object without password
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setUserType(userWithoutPassword.userType);
          
          // Store in localStorage for persistence
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userType,
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);