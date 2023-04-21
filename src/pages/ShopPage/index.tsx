import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { ToastContainer } from "react-toastify";
import { StyledContainer } from "../../styles/grid";
import { useContext } from "react";
import { FoodContext } from "../../contexts/foodContext";

const ShopPage = () => {
  const { showModalCart } = useContext(FoodContext);
  return (
    <StyledShopPage>
      {showModalCart && <CartModal />}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
      <ToastContainer theme="light" />
    </StyledShopPage>
  );
};

export default ShopPage;
