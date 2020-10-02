import React, { createContext, useState, Component, useEffect, useReducer, useRef } from "react";
import wikiFetch from './api/wikiApi'
import {storeCredentials, isLoggedIn , logout} from './api/authApi'

const AppContext = createContext({})
export const ContextConsumer = AppContext.Consumer
export type IAppContext = {
  
        storeCredentials : (username : string, pass : string)=> Promise<any>;
        isLoggedIn : () => Promise<boolean> , 
        logout : () => Promise<any>,
        wikiFetch : () =>  Promise<any>; //maybe a gen IResponse type
}

const AppContextProvider : React.SFC = ({children}) => {

    return (
        <AppContext.Provider 
            value={{ wikiFetch , logout,
            storeCredentials, isLoggedIn }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider

export const withAppContext = (Component : typeof React.Component) => {

    const Wrapper : React.SFC = (props) => (
        <ContextConsumer>
            {(context: any) =>(
                <Component {...props} context={context} />
            )}
        </ContextConsumer>
    )

    return Wrapper
}

