import React, { createContext, useContext, useReducer } from 'react';
import { jwtDecode } from 'jwt-decode';

// Define your initial state
const initialState = {
  loggedIn: false,
  credentialResponseDecoded: null,
  showForm:false,
  favorites:[],
  users:[],
};

// Define your reducer function
const bookReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        credentialResponseDecoded: action.payload // Store decoded credential response in state
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        credentialResponseDecoded: null // Clear credential response on logout
      };
      case 'TOGGLE':
        return {
            ...state,
            showForm: !state.showForm 
        }

        case 'GETFAV':
        return {
            ...state,
            favorites:[...action.payload]
        }

        case 'USERFAV':
            return {
                ...state,
                users:[...action.payload]
            }

    default:
      return state;
  }
};

const BookContext = createContext();

function BookProvider({ children }) {
  // useReducer hook to manage state
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}

export { BookContext, BookProvider };
