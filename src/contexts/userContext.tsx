import { createContext, useEffect, useState } from "react";
import { Api } from "../services/api";
import { TLoginFormValue } from "../schemas/loginSchema";
import { TRegisterFormValue } from "../schemas/registerSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IUserContextProps {
  children: React.ReactNode;
}
interface IUserContext {
  loginSubmit: (data: TLoginFormValue) => Promise<void>;
  registerSubmit: (data: TRegisterFormValue) => Promise<void>;
  userLogout: () => void;
  user: IUser | null;
  mesage: boolean;
  setMesage: React.Dispatch<React.SetStateAction<boolean>>;
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
interface IUserTRegisterResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const [mesage, setMesage] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");
    if (!token) {
      navigate("/");
    }

    const userAutoLogin = async () => {
      try {
        const response = await Api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        navigate("/shop");
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      } finally {
        setMesage(false);
      }
    };
    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  const loginSubmit = async (data: TLoginFormValue) => {
    try {
      const response = await Api.post<IUserLoginResponse>("/login", data);
      localStorage.setItem("@TOKEN", response.data.accessToken);
      localStorage.setItem("@USERID", JSON.stringify(response.data.user.id));
      setUser(response.data.user);
      toast.success("Login realizado com sucesso!", { autoClose: 2500 });
      setTimeout(() => {
        navigate("/shop");
      }, 2500);
    } catch (error) {
      toast.error("Erro ao efetuar o login!", { autoClose: 2500 });
      localStorage.removeItem("@TOKEN");
      localStorage.removeItem("@USERID");
    }
  };

  const registerSubmit = async (data: TRegisterFormValue) => {
    try {
      const response = await Api.post<IUserTRegisterResponse>("/users", data);
      toast.success("Cadastro realizado com sucesso!", { autoClose: 2500 });
      setTimeout(() => {
        navigate("/");
        localStorage.clear();
      }, 2500);
    } catch (error) {
      toast.error("Erro ao efetuar o cadastro!", { autoClose: 2500 });
    }
  };

  const userLogout = () => {
    toast.success("Saiu!", { autoClose: 1500 });
    setTimeout(() => {
      localStorage.clear();
      setUser(null);
      navigate("/");
    }, 1500);
  };

  return (
    <UserContext.Provider
      value={{
        loginSubmit,
        registerSubmit,
        userLogout,
        user,
        setMesage,
        mesage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
