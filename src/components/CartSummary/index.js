// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const priceArray = cartList.map(
        eachProduct => eachProduct.price * eachProduct.quantity,
      )
      const totalAmount = priceArray.reduce(
        (initialVal, currentVal) => initialVal + currentVal,
      )

      return (
        <div className="summary-container">
          <h1 className="summary-header">
            Order Total:{' '}
            <span className="total-amount">Rs {totalAmount}/-</span>
          </h1>
          <p className="summary-content">{cartList.length} items in cart</p>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
