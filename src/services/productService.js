// productService.js — S: Only responsible for API calls (Single Responsibility)
// D: Components depend on this abstraction, not on axios directly

import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

const api = axios.create({ baseURL: BASE_URL })

export const productService = {
  /**
   * Fetch paginated products
   */
  getProducts: async ({ limit = 12, skip = 0 } = {}) => {
    const { data } = await api.get(`/products?limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,rating,category,description,images`)
    return data // { products, total, skip, limit }
  },

  /**
   * Search products by query string
   */
  searchProducts: async ({ query, limit = 12, skip = 0 }) => {
    const { data } = await api.get(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,rating,category,description,images`)
    return data
  },

  /**
   * Get products by category
   */
  getByCategory: async ({ category, limit = 12, skip = 0 }) => {
    const { data } = await api.get(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,rating,category,description,images`)
    return data
  },

  /**
   * Get all categories
   */
  getCategories: async () => {
    const { data } = await api.get('/products/categories')
    return data // array of { slug, name, url }
  },

  /**
   * Get single product by id
   */
  getProductById: async (id) => {
    const { data } = await api.get(`/products/${id}`)
    return data
  },

  /**
   * Get featured/top-rated products for carousel (fixed set)
   */
  getFeaturedProducts: async () => {
    const { data } = await api.get('/products?limit=8&skip=0&select=id,title,price,thumbnail,rating,category,description')
    return data.products
  },
}
