import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { string } from "zod";
import { TSearchFormValue } from "../schemas/searchSchema";
import { Api } from "../services/api";
import { UserContext } from "./userContext";
interface IFoodContext {
  showModalCart: false | true;
  handleOpenModalCart: () => void;
  handleCloseModalCart: () => void;
  productList: IFoodList[] | [];
  addToCart: (item: IFoodList) => void;
  cartList: IFoodList[] | [];
  calculateCartPrice: () => void;
  removeAllFromCart: () => void;
  removeProductFromCart: (id: number) => void;
  searchProductByInput: (data: TSearchFormValue) => void;
}
interface IFoodProviderProps {
  children: React.ReactNode;
}
export interface IFoodList {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
}

export const FoodContext = createContext({} as IFoodContext);

export const FoodProvider = ({ children }: IFoodProviderProps) => {
  const itemAddLocalStorage = localStorage.getItem("@CARTLIST");
  const { setMesage } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModalCart, setShowModalCart] = useState(false);
  const [productList, setProductList] = useState<IFoodList[] | []>([]);
  const [cartList, setCartList] = useState<IFoodList[] | []>(
    itemAddLocalStorage ? JSON.parse(itemAddLocalStorage) : []
  );

  useEffect(() => {
    const foodLoad = async () => {
      const token = localStorage.getItem("@TOKEN");

      if (!token) {
        navigate("/");
      }
      try {
        const response = await Api.get<IFoodList[] | []>("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductList(response.data);
      } catch (error) {
        console.log(error);
        navigate("/register");
      } finally {
        setMesage(false);
      }
    };
    foodLoad();
  }, []);

  const handleOpenModalCart = () => {
    setShowModalCart(true);
  };

  const handleCloseModalCart = () => {
    setShowModalCart(false);
  };

  const addToCart = (item: IFoodList) => {
    if (
      !cartList.some((product: IFoodList) => {
        return product.id === item.id;
      })
    ) {
      const newProduct = [...cartList, item];
      toast.success("Item adicionado ao carrinho com sucesso!", {
        autoClose: 2500,
      });
      setCartList(newProduct);
    } else {
      toast.error("Este item já foi adicionado ao carrinho!", {
        autoClose: 2500,
      });
    }
  };
  const removeProductFromCart = (id: number) => {
    const filteredCartList = cartList.filter((item) => item.id !== id);
    setCartList(filteredCartList);
    toast.success("Item removido do carrinho com sucesso!", {
      autoClose: 2500,
    });
  };
  const calculateCartPrice = () => {
    const filterCartList = cartList.map((product) => {
      return product.price;
    });

    const calculation: number = filterCartList.reduce(
      (acc: number, val: number) => acc + val,
      0
    );
    return calculation.toFixed(2);
  };
  const removeAllFromCart = () => {
    localStorage.removeItem("@CARTLIST");
    toast.success("Itens removidos do carrinho!", {
      autoClose: 2500,
    });
    handleCloseModalCart();
    setCartList([]);
  };
  const searchProductByInput = (data: TSearchFormValue) => {
    const getProducts = productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(data.search.toLowerCase()) ||
        product.category.toLowerCase().includes(data.search.toLowerCase())
      );
    });
    setProductList(getProducts);
  };

  useEffect(() => {
    localStorage.setItem("@CARTLIST", JSON.stringify(cartList));
  }, [cartList]);
  return (
    <FoodContext.Provider
      value={{
        showModalCart,
        handleOpenModalCart,
        handleCloseModalCart,
        productList,
        addToCart,
        cartList,
        calculateCartPrice,
        removeAllFromCart,
        removeProductFromCart,
        searchProductByInput,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
