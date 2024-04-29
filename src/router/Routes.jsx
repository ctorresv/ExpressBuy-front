import React from 'react'
import { Routes as Router, Route } from "react-router-dom"

// routes
import MainLayout from '../layouts/MainLayout'
import { Home } from '../pages/Home'
//auth
import { Verify } from '../pages/auth/Verify'
import { SignIn } from '../pages/auth/SignIn'
import { SignUp } from '../pages/auth/SignUp'
//products
import { Products } from '../pages/products/Products'
import { ProductDetails } from '../pages/products/ProductDetails'
//checkout
import { CartDetails } from '../pages/checkout/CartDetails'
import { Checkout } from '../pages/checkout/Checkout'
import { Payment } from '../pages/checkout/Payment'
//user/profile
import { Profile } from '../pages/user/Profile'
//user/orders
import { Orders } from '../pages/user/Orders'
import { OrderDetails } from '../pages/user/OrderDetails'
//user/address
import { Addresses } from '../pages/user/Adresses'
import { CreateAddress } from '../pages/user/addresses/CreateAddress'
import { ModifyAddress } from '../pages/user/addresses/ModifyAddress'
import { DeleteAddress } from '../pages/user/addresses/DeleteAddress'
import { useSelector } from 'react-redux'
import { NotAuthenticatedRoute } from './NotAuthenticatedRoute'
import { ProductsAdmin } from '../pages/admin/ProductsAdmin'
import { AdminLayout } from '../layouts/AdminLayout'
import { OrdersAdmin } from '../pages/admin/OrdersAdmin'
import { EditsProduct } from '../pages/admin/EditProducts'
//chatboot//
import ChatBot from '../chat/chat'
//Admin
import { OrderDetailsAdmin } from '../pages/admin/OrderDetailsAdmin'
import { CreateProducts } from '../pages/admin/CreateProducts'
import { HomeAdmin } from '../pages/admin/HomeAdmin'
import { PaymentSuccess } from '../pages/checkout/PaymentSuccess'



export function Routes() {
  const { user } = useSelector(store => store.user.data)
  return (
    <Router>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
            <div className='hidden lg:block'><ChatBot /></div>

          </MainLayout >
        } />
      <Route
        path="/auth/login"
        element={
          <NotAuthenticatedRoute>
            <SignIn />
          </NotAuthenticatedRoute>

        } />
      <Route
        path="/auth/register"
        element={
          <SignUp />
        } />
      <Route
        path="/auth/verify"
        element={
          <Verify />
        } />
      <Route
        path='/products'
        element={
          <MainLayout>
            <Products />
          </MainLayout>
        }
      />
      <Route
        path='/products/details/:product_id'
        element={
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        }
      />
      <Route
        path='/checkout/details'
        element={
          <MainLayout>
            <CartDetails />
          </MainLayout>
        }
      />
      <Route
        path='/checkout/form'
        element={
          <MainLayout>
            <Checkout />
          </MainLayout>
        }
      />
      <Route
        path='/checkout/payment'
        element={
          <MainLayout>
            <Payment />
          </MainLayout>
        }
      />
      <Route
        path='/payment/success'
        element={
          <MainLayout>
            <PaymentSuccess />
          </MainLayout>
        }
      />
      <Route
        path='/user/profile'
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
      <Route
        path='/user/orders'
        element={
          <MainLayout>
            <Orders />
          </MainLayout>
        }
      />
      <Route
        path='/user/orders/details/:order_id'
        element={
          <MainLayout>
            <OrderDetails />
          </MainLayout>
        }
      />

      <Route path='adresses/create' element={
        <MainLayout>
          <CreateAddress />
        </MainLayout>
      } />
      <Route path='adresses/me' element={
        <MainLayout>
          <Addresses />
        </MainLayout>
      } />
      <Route path='modify/:address_id' element={
        <MainLayout>
          <ModifyAddress />
        </MainLayout>
      } />
      <Route path='delete/:address_id' element={
        <MainLayout>
          <DeleteAddress />
        </MainLayout>
      } />


      <Route
        path='/admin'
        element={
          <AdminLayout />
        }>

        <Route index element={<HomeAdmin />} />
        <Route path='products' element={<ProductsAdmin />} />
        <Route path='products/:id' element={<EditsProduct />} />
        <Route path='products/create' element={<  CreateProducts />} />
        <Route path='orders' element={<OrdersAdmin />} />
        <Route path='orders/:order_id' element={<OrderDetailsAdmin />} />
      </Route>
    </Router>
  )
}
