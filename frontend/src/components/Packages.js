import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";
import { packages as mockPackages } from "../data/mock";
import { getPackages } from "../services/api";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("wedding");
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Try fetching from backend, fallback to mock data
        const data = (await getPackages()) || mockPackages;
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setPackages(mockPackages);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Category filters
  const categories = [
    {
      id: "wedding",
      label: "Wedding Packages",
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "prewedding",
      label: "Pre-Wedding",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "maternity",
      label: "Maternity",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "commercial",
      label: "Commercial",
      color: "from-slate-500 to-gray-500",
    },
  ];

  if (loading) {
    return (
      <section id="packages" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center text-white">
          Loading packages...
        </div>
      </section>
    );
  }

  const filteredPackages = packages.filter(
    (pkg) => pkg.category.toLowerCase() === selectedCategory.toLowerCase(),
  );

  return (
    <section id="packages" className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-lg mb-6">
            <span className="text-sm font-medium text-purple-300">
              Choose Your Plan
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Photography Packages
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Select from our best value packages crafted for every occasion –
            whether it’s a wedding, pre-wedding, or maternity shoot.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              variant="ghost"
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? `text-white bg-gradient-to-r ${cat.color}`
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">
              No packages found for this category.
            </p>
          ) : (
            filteredPackages.map((pkg) => (
              <Card
                key={pkg.id}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
                className={`relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 backdrop-blur-lg ${
                  pkg.popular
                    ? "shadow-[0_0_25px_rgba(236,72,153,0.3)]"
                    : "shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                }`}
              >
                <CardContent className="p-8 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{pkg.name}</h3>
                    {pkg.popular && (
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md">
                        Popular
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-400 mb-4">{pkg.duration}</p>
                  <h4 className="text-3xl font-extrabold mb-6">{pkg.price}</h4>

                  <ul className="space-y-2 text-sm mb-6">
                    {pkg.features.slice(0, 5).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <Check className="text-green-400" size={16} /> {feature}
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full py-3 font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Packages;
