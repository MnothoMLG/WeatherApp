import { apiKey } from "../config"

export const weatherFetch = async (geoCords : {lat : number, lon : number}) => {

    const {lat, lon} = geoCords
    const uri = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    
    try {
        let response = await fetch(uri)
        let responseJson = await response.json()
        return responseJson
    }

    catch (error) {
        console.error(error)
        return {error}
    }
}

export const fourdayForecast = async (geoCords : {lat : number, lon : number}) => {

    const {lat, lon} = geoCords
    const uri = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`
    
    try {
        let response = await fetch(uri)
        let responseJson = await response.json()
        return responseJson
    }

    catch (error) {
        console.error(error)
        return {error}
    }
}

