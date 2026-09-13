// CategoryFilter.jsx — S: Category selection UI and dispatch only
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  setActiveCategory,
  clearFilters,
  selectCategories,
  selectActiveCategory,
} from '../../store/slices/productsSlice'

const selectCatStatus = (state) => state.products.categoriesStatus

const CategoryFilter = () => {
  const dispatch    = useDispatch()
  const categories  = useSelector(selectCategories)
  const active      = useSelector(selectActiveCategory)
  const catStatus   = useSelector(selectCatStatus)

  useEffect(() => {
    if (catStatus === 'idle') dispatch(fetchCategories())
  }, [dispatch, catStatus])

  const handleSelect = (slug) => {
    if (slug === active) dispatch(clearFilters())
    else dispatch(setActiveCategory(slug))
  }

  return (
    <aside aria-label="Category filter">
      <p className="sidebar-panel__title">Categories</p>
      <ul className="category-list" role="list">
        {/* All */}
        <li>
          <button
            onClick={() => dispatch(clearFilters())}
            className={`category-item ${!active ? 'category-item--active' : ''}`}
          >
            All Products
          </button>
        </li>

        {categories.map((cat) => {
          const slug = typeof cat === 'string' ? cat : cat.slug
          const name = typeof cat === 'string' ? cat : cat.name
          return (
            <li key={slug}>
              <button
                onClick={() => handleSelect(slug)}
                className={`category-item ${active === slug ? 'category-item--active' : ''}`}
              >
                {name}
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default CategoryFilter
