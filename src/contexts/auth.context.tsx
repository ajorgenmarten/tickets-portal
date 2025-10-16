import { createContext, useContext, type PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router";

type MeInformation = {
  username: string
  email: string
}

type AuthContextType = {
  me: MeInformation | null
  token: string | null
  logOut: () => void
  setMe: (me: MeInformation | null) => void
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType>({
  me: null,
  setMe: (info: MeInformation|null) => console.log(info),
  logOut: () => {},
  token: null,
  setToken: (token: string | null) => console.log(token)
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = (props: PropsWithChildren) => {
  const [me, setMe] = useState<MeInformation | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate()
  const logOut = () => {
    setMe(null);
    return navigate('/login')
  }

  return (
    <AuthContext.Provider value={({ me, setMe, logOut, token, setToken })}>
      {props.children}
    </AuthContext.Provider>
  ) 
}

export { useAuthContext, AuthProvider }
