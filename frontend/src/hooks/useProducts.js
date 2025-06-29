import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  });

  const fetchProducts = async (newFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = { ...filters, ...newFilters };
      const response = await productsAPI.getAll(params);
      
      setProducts(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await productsAPI.create(productData);
      toast.success('Product created successfully');
      await fetchProducts(); // Refresh the list
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create product';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await productsAPI.update(id, productData);
      toast.success('Product updated successfully');
      await fetchProducts(); // Refresh the list
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update product';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      toast.success('Product deleted successfully');
      await fetchProducts(); // Refresh the list
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete product';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};