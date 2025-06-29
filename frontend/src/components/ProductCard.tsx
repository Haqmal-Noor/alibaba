import React from "react";
import { ExternalLink, Eye, Tag } from "lucide-react";
import { redirectAPI } from "../services/api";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: {
    id?: string;
    name: string;
    slug?: string;
  };
  clickCount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleBuyClick = () => {
    window.open(redirectAPI.trackClick(product.id), "_blank");
  };

  return (
    <div
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
      role="region"
      aria-label={`Product: ${product.title}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title || "Product image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center space-x-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
            <Tag className="w-3 h-3" />
            <span>{product.category.name}</span>
          </span>
        </div>

        {/* Click Count */}
        {!!product.clickCount && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            <Eye className="w-3 h-3" />
            <span>{product.clickCount}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleBuyClick}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-transform duration-200 group/btn shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Buy ${product.title} on Alibaba`}
          >
            <span className="text-xs">Buy on Alibaba</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
