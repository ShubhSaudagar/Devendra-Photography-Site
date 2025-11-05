import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check, MessageCircle } from "lucide-react";
import { getPackages } from "../services/api";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("WEDDING");
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const categories = [
    {
      id: "WEDDING",
      label: "Wedding Packages",
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "PRE-WEDDING",
      label: "Pre-Wedding",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "MATERNITY_NEWBORN_FAMILY",
      label: "Maternity | NewBorn & Family",
      color: "from-amber-500 to-orange-500",
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
    (pkg) => pkg.category === selectedCategory
  );

  const handleWhatsAppClick = (pkg) => {
    const message = pkg.waMessageTemplate || `Hi, I'm interested in the "${pkg.title}" package.`;
    const waNumber = pkg.waNumber || '918308398378';
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="packages" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            wedding, pre-wedding, maternity, newborn & family shoots.
          </p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">
              No packages found for this category.
            </p>
          ) : (
            filteredPackages.map((pkg) => (
              <Card
                key={pkg._id}
                onMouseEnter={() => setHoveredPackage(pkg._id)}
                onMouseLeave={() => setHoveredPackage(null)}
                className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 backdrop-blur-lg shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              >
                <CardContent className="p-8 text-white">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                    <p className="text-purple-300 text-sm">{pkg.subtitle}</p>
                  </div>

                  <h4 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹ {pkg.price.toLocaleString('en-IN')}
                  </h4>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Features</p>
                      <ul className="space-y-2 text-sm">
                        {pkg.features && pkg.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-300"
                          >
                            <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pkg.terms && pkg.terms.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Terms</p>
                        <ul className="space-y-1 text-xs text-gray-400">
                          {pkg.terms.map((term, i) => (
                            <li key={i}>• {term}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={() => handleWhatsAppClick(pkg)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full py-3 font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    {pkg.ctaText || 'Book Now'}
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
