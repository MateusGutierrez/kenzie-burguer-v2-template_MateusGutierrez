import { createContext, useEffect, useState } from "react";
import { Api } from "../services/api";
import { ILoginFormData } from "../components/Form/LoginForm/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUserContextProps {
  children: React.ReactNode;
}
interface IUserContext {
  loginSubmit: (data: ILoginFormData) => Promise<void>;
}

interface IUser {
  email: string;
  name: string;
  id: number;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const loginSubmit = async (data: ILoginFormData) => {
    console.log("oi");
    try {
      const response = await Api.post<IUserLoginResponse>("/login", data);
      // localStorage.setItem("@TOKEN", data.acessToken)
      // localStorage.setItem("@USERID", JSON.stringify(data.user.id))

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ loginSubmit }}>
      {children}
    </UserContext.Provider>
  );
};
