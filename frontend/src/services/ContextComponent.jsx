import { createContext } from 'react'

const Context = createContext();


function ContextComponent({children, contextValue}) {

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
  
}

export {
    Context,
    ContextComponent
}