import axios from "axios"

export let apiUrl = 'https://expressbuymh.onrender.com/'

if (process.env.NODE_ENV === 'production') {
  apiUrl = import.meta.env.VITE_API
}

export const api = axios.create({baseURL: apiUrl})
               

export const endpoints = {
  sign_in: "/auth/signin",
  sign_up: "/auth/signup",
  sign_out: "/auth/signout",
  sign_in_token: "auth/token",
  get_menu: "menu",
  get_products: "products",
  get_discounts: "products/discounts",
  get_orders: "orders/me",
  get_addresses: "addresses/me",
  create_address: "addresses",
  update_address:"addresses/:id"
}

export const adminEnpoints =  {
  get_products_admin: "products",
  get_orders: "/orders",
  
}

export const cart_endpoint = {
  set_product: "carts/addproducts/",
  remove_product: "carts/deleteproduct/",
  clear_cart: "carts/clear/",
  add_address: "carts/address/",
  checkout: "carts/checkout/"
}

export function headers(token){
  return { headers: { 'Authorization': `Bearer ${token}` } }
}