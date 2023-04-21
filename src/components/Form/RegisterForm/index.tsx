import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../../schemas/registerSchema";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const { registerSubmit } = useContext(UserContext);

  const submit = (data: IRegisterData) => {
    registerSubmit(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="name"
        type="text"
        label="Nome"
        errors={errors.name?.message}
        {...register("name")}
      />
      <Input
        id="email"
        type="email"
        label="E-mail"
        errors={errors.email?.message}
        {...register("email")}
      />
      <Input
        id="password"
        type="password"
        label="Senha"
        errors={errors.password?.message}
        {...register("password")}
      />
      <Input
        id="confirmPassword"
        type="password"
        label="Confirme sua senha"
        errors={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray" type="submit">
        Cadastrar
      </StyledButton>
      <ToastContainer theme="light" />
    </StyledForm>
  );
};

export default RegisterForm;
