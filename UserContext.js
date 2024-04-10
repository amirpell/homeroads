import { createContext,useState } from "react"

const UserType = createContext();

const UserContext = ({children}) => {
        const [userIdP,setUserIdP] = useState("");

  return (
    <UserType.Provider value={{userIdP,setUserIdP}}>
            {children}
    </UserType.Provider>
  )
}

export {UserType,UserContext};
