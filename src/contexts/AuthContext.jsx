import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthorized: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payLoad, isAuthorized: true };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknow Action Type");
  }
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

function AuthProvider({ children }) {
  const [{ user, isAuthorized }, dispatch] = useReducer(reducer, initialState);

  const FAKE_USER = {
    name: "Sankar",
    email: "sk",
    password: "sk",
  };

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payLoad: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authcontext is outised the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
