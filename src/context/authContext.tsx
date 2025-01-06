// context/todoContext.tsx
import * as React from 'react';
import { LoginContextType, AUser } from '../@types/App';
import { useAppApi } from '../services/dbConnect';

export const AuthContext = React.createContext<LoginContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const { postData, getData, updateData, deleteData } = useAppApi<null>();
    const [user, setUser] = React.useState<AUser>({});    
    const login = (user: AUser) => {
      const logingUser: AUser = {
            email: user.email,
            password: user.password
      };
    };

    const register = (user: AUser) => {
      const registerUser: AUser = {
            username: user.username,
            email: user.email,
            password: user.password
      };
    };
    return <AuthContext.Provider value={{ user, login, register }}>{children}</AuthContext.Provider>;
  };
  
  export default AuthProvider;