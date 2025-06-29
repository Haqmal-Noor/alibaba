import { useState, useEffect } from 'react';
import { categoriesAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const response = await categoriesAPI.create(categoryData);
      toast.success('Category created successfully');
      await fetchCategories(); // Refresh the list
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create category';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await categoriesAPI.update(id, categoryData);
      toast.success('Category updated successfully');
      await fetchCategories(); // Refresh the list
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update category';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoriesAPI.delete(id);
      toast.success('Category deleted successfully');
      await fetchCategories(); // Refresh the list
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete category';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories
  };
};