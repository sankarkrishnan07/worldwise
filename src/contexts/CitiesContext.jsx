import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const citiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  curCity: {},
  errorMsg: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payLoad, isLoading: false };
    case "city/loaded":
      return { ...state, curCity: action.payLoad, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payLoad],
        curCity: action.payLoad,
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
        isLoading: false,
      };
    case "rejected":
      return { ...state, isLoading: false, errorMsg: action.payLoad };
    default:
      throw new Error("Action type not found");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, curCity, errorMsg }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:9000/cities");
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch (error) {
        dispatch({ type: "rejected", payLoad: error.message });
      }
    }

    getCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      dispatch({ type: "city/loaded", payLoad: data });
    } catch (error) {
      dispatch({ type: "rejected", payLoad: error.errorMsg });
    }
  }, []);

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch (error) {
      dispatch({ type: "rejected", payLoad: error.errorMsg });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Something went wrong");
      dispatch({ type: "city/deleted", payLoad: id });
    } catch (error) {
      dispatch({ type: "rejected", payLoad: error.errorMsg });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        curCity,
        getCity,
        createCity,
        deleteCity,
        errorMsg,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

CitiesProvider.propTypes = {
  children: PropTypes.any,
};
