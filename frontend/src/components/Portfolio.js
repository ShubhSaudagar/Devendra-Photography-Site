import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Eye, Heart, Share2, ArrowRight } from "lucide-react";
import { portfolio as mockPortfolio } from "../data/mock"; // ✅ renamed to mockPortfolio
import { getPortfolio } from "../services/api"; // ✅ fallback compatible

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("wedding");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [portfolio, setPortfolio] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = (await getPortfolio()) || mockPortfolio;
        setPortfolio(data);
      } catch (error) {
        console.error("Error fetching portfolio, using mock:", error);
        setPortfolio(mockPortfolio);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const categories = [
    { id: "wedding", label: "Wedding & Events", color: "from-rose-500 to-pink-500" },
    { id: "prewedding", label: "Pre-Wedding", color: "from-purple-500 to-indigo-500" },
    { id: "cinematic", label: "Cinematic", color: "from-emerald-500 to-teal-500" },
    { id: "maternity", label: "Maternity | Family", color: "from-amber-500 to-orange-500" },
  ];

  const currentPortfolio = portfolio[activeCategory] || [];

  if (loading) {
    return (
      <section id="portfolio" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center text-white">Loading portfolio...</div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/40 to-black"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Portfolio Gallery
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A glimpse of our finest photography moments — timeless and elegant.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              variant="ghost"
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-white bg-gradient-to-r " + cat.color
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPortfolio.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 aspect-w-4 aspect-h-5 transform transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setHoveredImage(item.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-lg font-semibold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  {item.category}
                </p>
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                  <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex justify-center items-center">
                    <Eye size={18} className="text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex justify-center items-center">
                    <Heart size={18} className="text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex justify-center items-center">
                    <Share2 size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="text-center mt-16">
          <Button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-all duration-300">
            View Complete Gallery
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
