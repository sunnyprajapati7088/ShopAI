// useProducts — S: Only handles products data fetching side-effect
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectProducts,
  selectStatus,
  selectTotal,
  selectCurrentPage,
  selectSearchQuery,
  selectActiveCategory,
  selectTotalPages,
} from '../store/slices/productsSlice'
import { useDebounce } from './useDebounce'

export const useProducts = () => {
  const dispatch       = useDispatch()
  const products       = useSelector(selectProducts)
  const status         = useSelector(selectStatus)
  const total          = useSelector(selectTotal)
  const currentPage    = useSelector(selectCurrentPage)
  const searchQuery    = useSelector(selectSearchQuery)
  const activeCategory = useSelector(selectActiveCategory)
  const totalPages     = useSelector(selectTotalPages)

  const debouncedQuery = useDebounce(searchQuery, 400)

  // Track whether this is the very first mount so we always fire
  // immediately — even if debouncedQuery hasn't "changed" because the
  // user typed on a different page and navigated here.
  const mountedRef = useRef(false)

  useEffect(() => {
    // On first mount fire immediately regardless of debounce state
    if (!mountedRef.current) {
      mountedRef.current = true
      dispatch(
        fetchProducts({
          page: currentPage,
          query: searchQuery,   // use raw query on mount, not debounced
          category: activeCategory,
        })
      )
      return
    }

    // Subsequent changes: use debounced query
    dispatch(
      fetchProducts({
        page: currentPage,
        query: debouncedQuery,
        category: activeCategory,
      })
    )
  }, [dispatch, currentPage, debouncedQuery, activeCategory])

  return { products, status, total, currentPage, totalPages, searchQuery, activeCategory }
}
