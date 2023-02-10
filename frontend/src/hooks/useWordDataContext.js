import { WordDataContext } from "../context/WordDataContext";
import { useContext } from "react";

export const useWordDataContext = () => {
     const context = useContext(WordDataContext);
     if (!context) {
          throw Error(
               "useWordDataContext must be used inside an wordDataContextProvider"
          );
     }
     return context;
};