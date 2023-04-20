import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../schemas/loginSchema";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Input";
import Input2 from "../Input2";
export interface ILoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { loginSubmit } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const submit = (data: ILoginFormData) => {
    console.log(data);
    loginSubmit(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input id="login" label="E-mail" {...register("email")} type="email" />
      <Input
        id="senha"
        label="Senha"
        {...register("password")}
        type="password"
      />

      {/* <Input2/> */}

      <StyledButton $buttonSize="default" $buttonStyle="green" type="submit">
        Entrar
      </StyledButton>
      <ToastContainer theme="dark" />
    </StyledForm>
  );
};

export default LoginForm;
