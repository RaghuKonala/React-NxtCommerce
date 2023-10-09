import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(eachProduct => eachProduct.id === id)
    if (product.quantity > 1) {
      this.setState({
        cartList: cartList.map(eachProduct => {
          if (eachProduct.id === id) {
            return {...eachProduct, quantity: eachProduct.quantity - 1}
          }
          return eachProduct
        }),
      })
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          return {...eachProduct, quantity: eachProduct.quantity + 1}
        }
        return eachProduct
      }),
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachProduct => eachProduct.id !== id)
    this.setState({cartList: filteredList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isExistingProduct = cartList.find(
      eachProduct => eachProduct.id === product.id,
    )
    if (isExistingProduct) {
      this.setState({
        cartList: cartList.map(eachProduct => {
          if (eachProduct.id === product.id) {
            return {
              ...eachProduct,
              quantity: eachProduct.quantity + product.quantity,
            }
          }
          return eachProduct
        }),
      })
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
