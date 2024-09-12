'use client'; // Adicione esta linha no início do arquivo para indicar que este é um componente cliente

import React, { useState, useEffect } from 'react';
import { fetchProducts } from './api/index';
import styles from './page.module.css'; // Adicione ou ajuste as regras de CSS conforme necessário
import { useRouter } from 'next/navigation'; // Importar useRouter para navegação

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [openProductId, setOpenProductId] = useState(null); // Estado para controlar o produto expandido
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade da modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado
  const router = useRouter();

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
        setLoading(false); // Define o carregamento como falso após a tentativa de obter produtos
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
    setShowModal(true); // Exibe a modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Oculta a modal
    setSelectedProduct(null); // Limpa o produto selecionado
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBar}
      />
      <div>
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="All">Todas as categorias</option>
          {/* Adicione outras categorias aqui */}
        </select>
      </div>
      <div className={styles.grid}>
        {loading ? (
          <p>Loading...</p> // Exibe a animação de carregamento
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
