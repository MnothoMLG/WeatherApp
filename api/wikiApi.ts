const wikiFetch = async (query : string) => {

    console.log("wiki hello" , query)
    const srsearch = query.replace(/ /g, "%20")
    const base = `https://en.wikipedia.org/w/api.php`
    const uri = `${base}?action=opensearch&search=${srsearch}&format=json`
    try {
        let response = await fetch(uri)
        let responseJson = await response.json()
        // console.log({responseJson})
        return responseJson
    }

    catch (error) {
        console.error(error)
        return {error}
    }
}

export default wikiFetch