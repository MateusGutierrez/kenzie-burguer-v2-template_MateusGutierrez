import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { useContext } from "react";
import { FoodContext } from "../../../contexts/foodContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, TSearchFormValue } from "../../../schemas/searchSchema";

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSearchFormValue>({
    resolver: zodResolver(searchSchema),
  });
  const { searchProductByInput } = useContext(FoodContext);

  const submit = (data: TSearchFormValue) => {
    searchProductByInput(data);
  };
  return (
    <StyledSearchForm onSubmit={handleSubmit(submit)}>
      <input
        type="text"
        required
        placeholder="Digitar pesquisa"
        {...register("search")}
      />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
