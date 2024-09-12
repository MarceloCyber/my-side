// pages/products/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchProductById } from '../api/index'; // Ajuste o caminho conforme necessário
import styles from './productDetails.module.css'; // Adicione estilos conforme necessário

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID do produto da URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      if (id) {
        try {
          const data = await fetchProductById(id);
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    getProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.container}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}
