import React, { createContext } from "react";
import {weatherFetch , fourdayForecast} from './api/weatherApi'
import {addToFavs, getAllFavLocations, deleteEntry } from './api/prefsApi'

const AppContext = createContext({})
export const ContextConsumer = AppContext.Consumer
export interface ILocationObject {
    name?: string;
    coord?: {
        lat : number ;
        lon : number
    }
}

export type IAppContext = {
        addToFavs : (obj : ILocationObject) => Promise<void>,
        deleteEntry : (locName : string) => Promise<void>,
        getAllFavLocations :() => Promise<ILocationObject[]>
        weatherFetch : (coord : {lat : number,lon : number}) =>  Promise<any>; //maybe a gen IResponse type
        fourdayForecast : (coord : {lat : number,lon : number}) =>  Promise<any>;
}

const AppContextProvider : React.SFC = ({children}) => {

    return (
        <AppContext.Provider 
            value={{ 
                weatherFetch ,addToFavs , deleteEntry,
                getAllFavLocations, fourdayForecast
            }}
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

