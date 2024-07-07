import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Cities from "./components/Cities";
import Countries from "./components/Countries";
import TrackerForm from "./components/TrackerForm";
import City from "./components/City";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Tracker = lazy(() => import("./pages/Tracker"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="tracker"
                element={
                  <ProtectedRoute>
                    <Tracker />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<Cities />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<Countries />} />
                <Route path="form" element={<TrackerForm />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
