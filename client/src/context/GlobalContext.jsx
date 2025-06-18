import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [recipeList, setRecipeList] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <GlobalContext.Provider
      value={{
        recipeList,
        setRecipeList,
        favRecipes,
        setFavRecipes,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
