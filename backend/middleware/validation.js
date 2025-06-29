import mongoose from 'mongoose';

export const validateProduct = (req, res, next) => {
  const { title, description, price, categoryId, affiliateLink, image } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!description || description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!price || isNaN(price) || price <= 0) {
    errors.push('Price must be a positive number');
  }

  if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
    errors.push('Valid category is required');
  }

  if (!affiliateLink || !isValidUrl(affiliateLink)) {
    errors.push('Valid affiliate link is required');
  }

  if (!image || !isValidUrl(image)) {
    errors.push('Valid image URL is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

export const validateCategory = (req, res, next) => {
  const { name, description } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Category name must be at least 2 characters long');
  }

  if (!description || description.trim().length < 5) {
    errors.push('Description must be at least 5 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};