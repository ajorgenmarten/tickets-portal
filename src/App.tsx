import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "./pages/login.page";
import { Bounce, ToastContainer } from "react-toastify";
import { getTheme } from "./lib/theme";
import { AuthProvider } from "./contexts/auth.context";
import { HomeLayout } from "./pages/home-layout.page";
import { IsAuth } from "./components/logic/is-auth";
import { CredentialsPage } from "./pages/credentials.page";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <IsAuth>
                <HomeLayout />
              </IsAuth>
            }
          />
          <Route path="/credentials" element={<CredentialsPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={10000}
          theme={getTheme()}
          transition={Bounce}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
