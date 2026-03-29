import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("grid"); // ✅ fixed
  const [sort, setSort] = useState("newest");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories   ");
        setCategories(res.data.categories || []);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:3000/api/product", {
          params: {
            search,
            sort,
            ...(category !== "all" && { category }),
          },
        });

        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, sort]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-16 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        {/* 🔍 Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <select
            className="border rounded-md px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            className="border rounded-md px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-5">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <div className="rounded-md p-2 bg-[linear-gradient(135deg,hsl(230,65%,25%),hsl(262,83%,58%))]">
                <Grid3X3 className="h-5 w-5 text-white" />
              </div>
            </Button>

            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
              className={"flex items-center justify-center"}
            >
              <div className="">
                <List className="h-5 w-5" />
              </div>
            </Button>
          </div>
        </div>

        {/* 🔄 Loading */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-300 rounded-lg mb-3" />
                  <div className="h-4 bg-gray-300 rounded mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <SlidersHorizontal className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting filters</p>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-4"
            }
          >
            {products.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <Card
                  className={`group hover:shadow-md transition ${
                    view === "list" ? "flex" : ""
                  }`}
                >
                  <CardContent
                    className={`p-4 ${
                      view === "list" ? "flex gap-4 items-center" : ""
                    }`}
                  >
                    <div
                      className={`bg-gray-200 rounded-lg overflow-hidden ${
                        view === "list" ? "w-24 h-24" : "aspect-square mb-3"
                      }`}
                    >
                      <img
                        src={product.images?.[0]?.url}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.title}</p>
                      <p className="text-xs text-gray-500">
                        {product.category?.name}
                      </p>

                      <div className="flex gap-2 mt-1">
                        <span className="font-bold text-sm">
                          ₹{product.price}
                        </span>
                      </div>

                      {product.featured && (
                        <Badge className="mt-1 text-xs">Featured</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
