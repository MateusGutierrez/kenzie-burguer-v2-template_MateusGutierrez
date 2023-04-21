import { useForm } from "react-hook-form";
import { LoginSchema, TLoginFormValue } from "../../../schemas/loginSchema";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Input";

export const LoginForm = () => {
  const { loginSubmit } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValue>({
    resolver: zodResolver(LoginSchema),
  });

  const submit = (data: TLoginFormValue) => {
    loginSubmit(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="login"
        label="E-mail"
        {...register("email")}
        type="email"
        errors={errors.email?.message}
      />
      <Input
        id="senha"
        label="Senha"
        {...register("password")}
        errors={errors.password?.message}
        type="password"
      />

      <StyledButton $buttonSize="default" $buttonStyle="green" type="submit">
        Entrar
      </StyledButton>
      <ToastContainer theme="light" />
    </StyledForm>
  );
};

export default LoginForm;
