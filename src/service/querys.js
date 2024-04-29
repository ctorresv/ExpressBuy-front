import axios from "axios"

const api = axios.create("http://localhost:8000/")

const ls = {
    get: function (key) {
        let response = JSON.parse(localStorage.getItem(key))
        return response
    },
    modify_token: function (key) {
        this.get('token')
        //modificacion
    }
}

function getToken() {
    JSON.stringify()
    let token = JSON.parse()
}

export function getProducts() {
    let token = "slakjhalkjdhasdh"
    api.get("/producst", token)
}
export async function getCategories() {
    try {

        let response = await api.get("/categories", token)
        //trabajas la data aca
        return {
            //retornas la data limpia
        }
    } catch (error) {
        return {
            error
        }
    }
}


//user
//cart
//menu -> department, categories, subcategories}

//menu desplegable, filtros dentro de products,