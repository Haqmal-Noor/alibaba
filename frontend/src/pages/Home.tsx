import React, {useRef, useState, useEffect } from "react";
import {
  Package,
  AlertCircle,
  Search as SearchIcon,
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import LoadingSpinner from "../components/LoadingSpinner";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { categories } = useCategories();

  const { products, loading, pagination, fetchProducts } = useProducts({
    page: currentPage,
    limit: 12,
    ...(selectedCategory !== "all" && { category: selectedCategory }),
    ...(searchTerm && { search: searchTerm }),
  });

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts({
        page: 1,
        limit: 12,
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  // Page change effect
  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts({
        page: currentPage,
        limit: 12,
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
      });
    }
  }, [currentPage]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSearchSubmit = () => {
    if (nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-bounce"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-6 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                  <Package className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                Discover Amazing
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Deals & Products
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed font-light">
                Unlock exclusive affiliate deals from Alibaba's finest sellers.
                <span className="block mt-2 font-medium text-white">
                  Premium quality • Trusted partners • Unbeatable savings
                </span>
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <SearchBar
                        value={searchTerm}
                        onChange={handleSearch}
                        onSubmit={handleSearchSubmit}
                        placeholder="Search for products, categories, or brands..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: TrendingUp, label: "Trending Products", value: "10K+" },
                { icon: Star, label: "Happy Customers", value: "50K+" },
                { icon: Sparkles, label: "Daily Deals", value: "100+" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore our carefully curated categories to find exactly what
              you're looking for
            </p>
            {searchTerm && (
              <div className="mt-4 inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <SearchIcon className="h-4 w-4 mr-2" />
                Searching for: "{searchTerm}"
              </div>
            )}
          </div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Products Section */}
        <div ref={nextSectionRef} className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {searchTerm ? "Search Results" : "Featured Products"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {searchTerm
                  ? "Products matching your search"
                  : "Handpicked deals just for you"}
              </p>
            </div>
            {!loading && pagination.total > 0 && (
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-900 dark:text-white">
                    {(pagination.page - 1) * pagination.limit + 1} -{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-900 dark:text-white">
                    {pagination.total}
                  </span>{" "}
                  products
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative">
                  <LoadingSpinner size="lg" />
                </div>
              </div>
              <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg">
                Loading amazing products...
              </p>
            </div>
          ) : products.length === 0 ? (
            /* Empty State */
            <div className="text-center py-24">
              <div className="mx-auto max-w-md">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-slate-100 dark:bg-slate-800 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  No products found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria to discover amazing products."
                    : "No products are available at the moment. Please check back later for exciting deals."}
                </p>
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Products Grid */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slide-up hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Enhanced Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-3">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 disabled:hover:border-slate-200 shadow-sm hover:shadow-md"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-w-[3rem] ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110"
                              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 shadow-sm hover:shadow-md"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 disabled:hover:border-slate-200 shadow-sm hover:shadow-md"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
