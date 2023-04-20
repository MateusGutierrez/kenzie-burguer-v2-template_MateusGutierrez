import { UseFormRegisterReturn } from "react-hook-form";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";

interface IInputProps {
  label: string;
  id: string;
  errors: string | undefined;
  type: "email" | "password";
  register: UseFormRegisterReturn<string>;
}
const Input2 = ({ id, label, errors, type, register }: IInputProps) => {
  return (
    <div>
      <StyledInputContainer>
        <input id={id} {...register} />
        <label htmlFor={id}>{label}</label>
      </StyledInputContainer>
      <StyledParagraph fontColor="red">{errors}</StyledParagraph>
    </div>
  );
};
export default Input2;
