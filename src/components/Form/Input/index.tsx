import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: "name" | "password" | "email" | "confirmPassword" | "login" | "senha";
  label: string;
  errors: string | undefined;
}

const Input = forwardRef(
  (
    { id, label, errors, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <StyledInputContainer>
          <input id={id} ref={ref} {...rest} />
          <label>{label}</label>
        </StyledInputContainer>
        <StyledParagraph fontColor="red">{errors}</StyledParagraph>
      </div>
    );
  }
);

export default Input;
