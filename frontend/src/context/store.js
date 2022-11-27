const { createContext, useState, useContext } = require("react");

const userContext = createContext(null);

function Store({ children }) {
    const [user, setUser] = useState();
    console.log(user);
  return (
    <userContext.Provider value={{user,setUser}} >
        {children}
    </userContext.Provider>
  )
}

export const UserState = () => {
    return useContext(userContext);
} 

export default Store