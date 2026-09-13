// useCart — S: Only exposes cart-related actions and state
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectIsInCart,
} from '../store/slices/cartSlice'

export const useCart = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)

  return {
    items,
    count,
    total,
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
  }
}

// Separate hook for checking single product — I: consumers import only what they need
export const useIsInCart = (id) => useSelector(selectIsInCart(id))
