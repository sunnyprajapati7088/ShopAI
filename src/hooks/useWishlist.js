// useWishlist — S: Only exposes wishlist-related actions and state
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleWishlist,
  removeFromWishlist,
  selectWishlistItems,
  selectWishlistCount,
  selectIsWishlisted,
} from '../store/slices/wishlistSlice'

export const useWishlist = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectWishlistItems)
  const count = useSelector(selectWishlistCount)

  return {
    items,
    count,
    toggleWishlist: (product) => dispatch(toggleWishlist(product)),
    removeFromWishlist: (id) => dispatch(removeFromWishlist(id)),
  }
}

export const useIsWishlisted = (id) => useSelector(selectIsWishlisted(id))
