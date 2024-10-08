'use client';
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/index';
import styles from '../pages/styled/page.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade da modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data && data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Fetched data does not contain products array:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (product && typeof product === 'object') {
      return (
        (categoryFilter === 'All' || product.category === categoryFilter) &&
        product.title && product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return false;
  });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />
      <div>
        <select className={styles.categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="All">Todas as categorias</option>
          {/* Adicione outras categorias aqui */}
        </select>
      </div>
      <div className={styles.grid}>
        {loading ? (
          <div>
            <div className={styles.loadingSpinner}></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className={styles.card}>
              <img src={product.image} alt={product.title} className={styles.image}/>
              <h3>{product.title}</h3>
              <p>Preço: {product.price}$</p>
              <p>{product.category}</p>
              <button onClick={() => handleOpenModal(product)}>
                Ver detalhes do produto
              </button>
            </div>
          ))
        ) : (
          <p>Produto não encontrado.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>X</button>
            <img src={selectedProduct.image} alt={selectedProduct.title} className={styles.modalImage} />
            <h3>{selectedProduct.title}</h3>
            <p>{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
