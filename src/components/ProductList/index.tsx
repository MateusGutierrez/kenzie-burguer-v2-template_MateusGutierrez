import { useContext } from "react";
import { FoodContext } from "../../contexts/foodContext";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";

const ProductList = () => {
  const { productList } = useContext(FoodContext);
  return (
    <StyledProductList>
      {productList.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </StyledProductList>
  );
};

export default ProductList;
