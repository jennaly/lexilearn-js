import { FavoriteWordsContext } from "../context/FavoriteWordsContext";
import { useContext } from "react";

export const useFavoriteWordsContext = () => {
     const context = useContext(FavoriteWordsContext);
     if (!context) {
          throw Error(
               "useFavoriteWordsContext must be used inside an FavoriteWordsContextProvider"
          );
     }
     return context;
};