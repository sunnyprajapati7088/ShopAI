// wishlistSlice.js — S: Single responsibility — manage wishlist state only
import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [], // { id, title, price, thumbnail, rating, category }
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistCount = (state) => state.wishlist.items.length
export const selectIsWishlisted = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id)

export default wishlistSlice.reducer
