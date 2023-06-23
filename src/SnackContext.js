import React, { createContext, useReducer } from "react";

import { snacks } from "./db";

export const SnackContext = createContext();

export const SnackProvider = ({ children }) => {
  const initialState = {
    snackData: snacks,
    searchText: "",
    sortColumn: null,
    sortDirection: "asc",
  };

  const actionTypes = {
    UPDATE_SEARCH_TEXT: "UPDATE_SEARCH_TEXT",
    SORT_COLUMN: "SORT_COLUMN",
  };

  const snackReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_SEARCH_TEXT:
        return {
          ...state,
          searchText: action.payload,
        };
      case actionTypes.SORT_COLUMN:
        const { sortColumn, sortDirection } = action.payload;

        const sortedData = [...state.snackData].sort((a, b) => {
          const valueA = String(a[sortColumn]).toLowerCase();
          const valueB = String(b[sortColumn]).toLowerCase();

          if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
          if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
          
        });
       
        return {
          ...state,
          snackData:[...sortedData],
          sortColumn,
          sortDirection,
        };
      default:
        return state;
    }
  };

  
  const [snackState, snackDispatcher] = useReducer(snackReducer, initialState);
console.log(snackState.snackData)
  return (
    <SnackContext.Provider value={{ snackState, snackDispatcher, actionTypes }}>
      {children}
    </SnackContext.Provider>
  );
};
