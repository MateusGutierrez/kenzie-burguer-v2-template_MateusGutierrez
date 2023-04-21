import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { FoodContext, IFoodList } from "../../../../contexts/foodContext";
import { useContext } from "react";
interface CartProductProps {
  product: IFoodList;
}

const CartProductCard = ({ product }: CartProductProps) => {
  const { removeProductFromCart } = useContext(FoodContext);
  return (
    <StyledCartProductCard id={JSON.stringify(product.id)}>
      <div className="imageBox">
        <img src={product.img} alt="productCart" />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => removeProductFromCart(product.id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
