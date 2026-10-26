
import { useState } from 'react'
import './App.css'

const initialProducts = [
  { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 180, stock: 24 },
  { id: 2, name: 'Whole Milk', category: 'Dairy', price: 65, stock: 8 },
  { id: 3, name: 'Bananas', category: 'Fruits', price: 60, stock: 32 },
  { id: 4, name: 'Brown Bread', category: 'Bakery', price: 45, stock: 5 },
  { id: 5, name: 'Tomatoes', category: 'Vegetables', price: 40, stock: 18 },
]

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [activePage, setActivePage] = useState('Dashboard')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Fruits')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  )

  const lowStock = products.filter((product) => product.stock < 10).length
  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock, 0
  )

  function addProduct(event) {
    event.preventDefault()
    if (!name.trim() || price === '' || stock === '') return

    setProducts([...products, {
      id: Date.now(),
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
    }])

    setName('')
    setPrice('')
    setStock('')
    setShowForm(false)
  }

  function deleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">G</div>
          <div>
            <h2>GrocerScan</h2>
            <span>SMART INVENTORY</span>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>
        {['Dashboard', 'Products', 'Inventory', 'Reports'].map((page, index) => (
          <button
            key={page}
            className={`nav-item ${activePage === page ? 'active' : ''}`}
            onClick={() => setActivePage(page)}
          >
            <span>{['◫', '▦', '◷', '▤'][index]}</span>
            {page}
            {page === 'Inventory' && lowStock > 0 && (
              <b className="nav-count">{lowStock}</b>
            )}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="help-card">
            <span>✦ Need a hand?</span>
            <p>Keep your store running smoothly.</p>
          </div>
          <div className="profile">
            <div className="avatar">GM</div>
            <div><strong>Store Manager</strong><small>Administrator</small></div>
            <span className="profile-dots">•••</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {activePage}</div>
          <div className="top-actions">
            <span className="status-dot">● Store Online</span>
            <div className="top-avatar">GM</div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">THURSDAY · YOUR STORE AT A GLANCE</p>
              <h1>{activePage === 'Dashboard' ? 'Good evening 👋' : activePage}</h1>
              <p className="subtitle">Here’s what’s happening with your store today.</p>
            </div>
            <button className="primary-button" onClick={() => setShowForm(!showForm)}>
              <span>＋</span> Add product
            </button>
          </div>

          {showForm && (
            <form className="add-form" onSubmit={addProduct}>
              <h3>Add a new product</h3>
              <div className="form-grid">
                <input placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Fruits</option><option>Vegetables</option><option>Dairy</option><option>Bakery</option><option>Other</option>
                </select>
                <input type="number" min="0" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="number" min="0" placeholder="Stock quantity" value={stock} onChange={(e) => setStock(e.target.value)} required />
              </div>
              <button className="primary-button" type="submit">Save product</button>
            </form>
          )}

          <div className="stats-grid">
            <article className="stat-card">
              <div className="stat-top"><span>Total products</span><span className="stat-icon green">▦</span></div>
              <h2>{products.length}</h2><p className="stat-note">Products in your catalogue</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Inventory value</span><span className="stat-icon blue">₹</span></div>
              <h2>₹{totalValue.toLocaleString('en-IN')}</h2><p className="stat-note">Based on current stock</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Low stock alerts</span><span className="stat-icon orange">!</span></div>
              <h2>{lowStock}</h2><p className="stat-note">Products need attention</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Categories</span><span className="stat-icon purple">◈</span></div>
              <h2>{new Set(products.map((p) => p.category)).size}</h2><p className="stat-note">Active product categories</p>
            </article>
          </div>

          <div className="content-grid">
            <section className="panel products-panel">
              <div className="panel-heading">
                <div><h3>Product inventory</h3><p>Manage and track your store products.</p></div>
                <button className="text-button" onClick={() => setActivePage('Products')}>View all ↗</button>
              </div>

              <div className="search-wrap">
                <span>⌕</span>
                <input placeholder="Search products or categories..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>

              <div className="table-scroll">
                <table>
                  <thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>ACTION</th></tr></thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td><div className="product-name"><span className="product-emoji">{({ Fruits: '🍎', Dairy: '🥛', Bakery: '🍞', Vegetables: '🥬', Other: '📦' })[product.category]}</span><strong>{product.name}</strong></div></td>
                        <td><span className="category-pill">{product.category}</span></td>
                        <td>₹{product.price}</td>
                        <td><span className={`stock-pill ${product.stock < 10 ? 'low' : 'good'}`}>{product.stock} units</span></td>
                        <td><button className="delete-button" title="Delete product" onClick={() => deleteProduct(product.id)}>×</button></td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && <tr><td colSpan="5" className="empty-state">No products found.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">Showing {filteredProducts.length} of {products.length} products</div>
            </section>

            <aside className="right-column">
              <section className="panel stock-panel">
                <div className="panel-heading"><div><h3>Stock overview</h3><p>Inventory health check</p></div></div>
                <div className="stock-summary"><div><strong>{products.length - lowStock}</strong><span>Healthy</span></div><div><strong className="warning-text">{lowStock}</strong><span>Low stock</span></div></div>
                <div className="stock-bar"><span style={{ width: `${products.length ? ((products.length - lowStock) / products.length) * 100 : 0}%` }} /></div>
                <p className="small-muted">Stock levels update when you add or remove products.</p>
              </section>

              <section className="panel alerts-panel">
                <div className="panel-heading"><div><h3>Needs attention</h3><p>Low stock products</p></div><span className="alert-badge">{lowStock}</span></div>
                {products.filter((p) => p.stock < 10).length === 0 ? <p className="small-muted">All products are well stocked.</p> :
                  products.filter((p) => p.stock < 10).map((product) => (
                    <div className="alert-item" key={product.id}>
                      <span className="alert-symbol">!</span>
                      <div><strong>{product.name}</strong><small>Only {product.stock} units left</small></div>
                    </div>
                  ))}
              </section>
            </aside>
          </div>

          <footer className="footer">GrocerScan <span>•</span> Smart inventory management <span className="footer-right">Built for smarter stores</span></footer>
        </section>
      </main>
    </div>
  )
}

export default App
