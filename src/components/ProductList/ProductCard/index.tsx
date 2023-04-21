import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { FoodContext, IFoodList } from "../../../contexts/foodContext";
import { useContext } from "react";
interface IProductCardProps {
  product: IFoodList;
}
const ProductCard = ({ product }: IProductCardProps) => {
  const { addToCart } = useContext(FoodContext);
  return (
    <StyledProductCard id={JSON.stringify(product.id)}>
      <div className="imageBox">
        <img src={product.img} alt="Product" />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">
          R$ {product.price.toFixed(2)}
        </StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          id={JSON.stringify(product.id)}
          onClick={() => addToCart(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
