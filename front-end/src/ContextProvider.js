import React,{createContext,useState} from 'react'

export const Context = createContext({});

export function ContextProvider({children}) {
  const [updated,setUpdated] = useState(0);
  return (
    <Context.Provider value={{updated,setUpdated}}>
      {children}
    </Context.Provider>
  )
}
