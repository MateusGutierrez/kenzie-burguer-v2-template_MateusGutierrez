import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";

const RegisterForm = () => (
  <StyledForm>
    <Input id="name" label="Nome" />
    <Input id="email" label="E-mail" />
    <Input id="password" label="Senha" />
    <Input id="confirmPassword" label="Confirme sua senha" />
    <StyledButton $buttonSize="default" $buttonStyle="gray" type="submit">
      Cadastrar
    </StyledButton>
  </StyledForm>
);

export default RegisterForm;
