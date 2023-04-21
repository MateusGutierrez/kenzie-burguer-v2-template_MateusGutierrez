import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { FoodContext } from "../../../contexts/foodContext";
const CartProductList = () => {
  const { cartList, calculateCartPrice, removeAllFromCart } =
    useContext(FoodContext);
  const totalPrice = `R$ ${calculateCartPrice()}`;

  return (
    <StyledCartProductList>
      <ul>
        {cartList.map((product) => {
          return <CartProductCard product={product} key={product.id} />;
        })}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">{totalPrice}</StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={removeAllFromCart}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
