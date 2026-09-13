// productsSlice.js — S: Single responsibility — manage products list state
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productService } from '../../services/productService'

const ITEMS_PER_PAGE = 12

// Async thunks — each thunk has a single purpose (O: open for extension)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, category = '', query = '' } = {}, { rejectWithValue }) => {
    try {
      const skip = (page - 1) * ITEMS_PER_PAGE
      const params = { limit: ITEMS_PER_PAGE, skip }

      if (query) {
        return await productService.searchProducts({ ...params, query })
      }
      if (category) {
        return await productService.getByCategory({ ...params, category })
      }
      return await productService.getProducts(params)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getFeaturedProducts()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getCategories()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    featured: [],
    categories: [],
    total: 0,
    currentPage: 1,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    featuredStatus: 'idle',
    categoriesStatus: 'idle',
    error: null,
    searchQuery: '',
    activeCategory: '',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload
      state.currentPage = 1
      state.searchQuery = ''
    },
    clearFilters: (state) => {
      state.searchQuery = ''
      state.activeCategory = ''
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.products
        state.total = action.payload.total
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // fetchFeaturedProducts
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.featuredStatus = 'loading'
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredStatus = 'succeeded'
        state.featured = action.payload
      })
      .addCase(fetchFeaturedProducts.rejected, (state) => {
        state.featuredStatus = 'failed'
      })
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = 'failed'
      })
  },
})

export const { setCurrentPage, setSearchQuery, setActiveCategory, clearFilters } = productsSlice.actions

// Selectors — I: consumers only import what they need
export const selectProducts = (state) => state.products.items
export const selectFeatured = (state) => state.products.featured
export const selectCategories = (state) => state.products.categories
export const selectTotal = (state) => state.products.total
export const selectCurrentPage = (state) => state.products.currentPage
export const selectStatus = (state) => state.products.status
export const selectFeaturedStatus = (state) => state.products.featuredStatus
export const selectSearchQuery = (state) => state.products.searchQuery
export const selectActiveCategory = (state) => state.products.activeCategory
export const selectTotalPages = (state) => Math.ceil(state.products.total / ITEMS_PER_PAGE)
export const ITEMS_PER_PAGE_CONST = ITEMS_PER_PAGE

export default productsSlice.reducer
