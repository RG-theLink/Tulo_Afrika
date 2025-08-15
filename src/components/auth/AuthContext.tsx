import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { auth } from '../../lib/api';

// Define user types
export type UserType = 'student' | 'educator' | 'admin' | 'school';

// Define user interface
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserType;
  name?: string; // for backward compatibility
  userType?: UserType; // for backward compatibility
}

// Define context interface
interface AuthContextType {
  user: User | null;
  userType: UserType | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  login: async () => null,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true
});

// Demo users for fallback authentication
const demoUsers = [
  {
    id: '1',
    email: 'demo.student@tutokitulo.africa',
    password: 'student123',
    fullName: 'Alex Johnson',
    role: 'student' as UserType
  },
  {
    id: '2',
    email: 'demo.educator@tutokitulo.africa',
    password: 'educator123',
    fullName: 'Dr. Sarah Wilson',
    role: 'educator' as UserType
  },
  {
    id: '3',
    email: 'admin@tutokitulo.africa',
    password: 'admin123',
    fullName: 'Michael Chen',
    role: 'admin' as UserType
  }
];

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          // Try to verify the token with the backend
          try {
            const response = await auth.verify();
            const user = response.user;
            // Add backward compatibility fields
            user.name = user.fullName;
            user.userType = user.role;
            setUser(user);
            setUserType(user.role);
          } catch (error) {
            // If verification fails, use stored user data
            const parsedUser = JSON.parse(storedUser);
            // Ensure backward compatibility
            if (!parsedUser.fullName && parsedUser.name) {
              parsedUser.fullName = parsedUser.name;
            }
            if (!parsedUser.role && parsedUser.userType) {
              parsedUser.role = parsedUser.userType;
            }
            parsedUser.name = parsedUser.fullName;
            parsedUser.userType = parsedUser.role;
            setUser(parsedUser);
            setUserType(parsedUser.role || parsedUser.userType);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      // Try to login with the backend API
      const response = await auth.login(email, password);
      const user = response.user;
      
      // Add backward compatibility fields
      user.name = user.fullName;
      user.userType = user.role;
      
      setUser(user);
      setUserType(user.role);
      
      return user;
    } catch (error) {
      console.error('API login error:', error);
      
      // Fallback to demo users if API fails
      const foundUser = demoUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Create user object without password
        const { password, ...userWithoutPassword } = foundUser;
        const user = {
          ...userWithoutPassword,
          name: userWithoutPassword.fullName,
          userType: userWithoutPassword.role
        };
        
        setUser(user);
        setUserType(user.role);
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user));
        // Store a dummy token for demo mode
        localStorage.setItem('authToken', 'demo-token-' + user.id);
        
        return user;
      }
      
      return null;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setUserType(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userType,
      login, 
      logout, 
      isAuthenticated: !!user,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);