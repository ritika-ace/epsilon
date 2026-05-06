// src/pages/home.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import logo from "@assets/your_logo.jpg";

type Branding = {
  id: string;
  logoUrl: string | null;
  companyName: string;
  primaryColor: string;
  accentColor: string;
  bannerUrl: string | null;
  bannerText: string | null;
  updatedAt: string;
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const { data: branding } = useQuery<Branding>({
    queryKey: ["/api/admin/branding"],
  });

  // Virtusa-like defaults (fallbacks)
  const companyName = branding?.companyName || "Virtusa";
  const primary = branding?.primaryColor || "#000000"; // Sleek Black
  const accent = branding?.accentColor || "#3b82f6"; // Attractive Blue

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand-primary", primary);
    root.style.setProperty("--brand-accent", accent);
  }, [primary, accent]);

  const options = [
    {
      id: "brand-store",
      title: "Brand Store",
      description: "Explore our exclusive brand collection",
      position: "top-left",
      path: "/dashboard",
    },
    {
      id: "special-occasions",
      title: "Special Occasions",
      description: "Gifts for memorable moments",
      position: "top-right",
      path: "/special-occasions",
    },
    {
      id: "Blog",
      title: "Blog",
      description: "Blogs",
      position: "bottom-left",
      path: "/blog",
    },
    {
      id: "csr-blog",
      title: "CSR Support",
      description: "Corporate social responsibility & insights",
      position: "bottom-right",
      path: "/csr",
    },
  ];

  const getPositionStyles = (position: string) => {
    const baseStyles = "absolute transform transition-all duration-300 ease-in-out";
    switch (position) {
      case "top-left":
        return `${baseStyles} top-0 left-0 -translate-x-1/2 -translate-y-1/2`;
      case "top-right":
        return `${baseStyles} top-0 right-0 translate-x-1/2 -translate-y-1/2`;
      case "bottom-left":
        return `${baseStyles} bottom-0 left-0 -translate-x-1/2 translate-y-1/2`;
      case "bottom-right":
        return `${baseStyles} bottom-0 right-0 translate-x-1/2 translate-y-1/2`;
      default:
        return baseStyles;
    }
  };

  const getHoverEffect = (optionId: string, position: string) => {
    if (hoveredOption !== optionId) return {};
    switch (position) {
      case "top-left":
        return { transform: "translate(-55%, -55%) scale(1.06)" };
      case "top-right":
        return { transform: "translate(55%, -55%) scale(1.06)" };
      case "bottom-left":
        return { transform: "translate(-55%, 55%) scale(1.06)" };
      case "bottom-right":
        return { transform: "translate(55%, 55%) scale(1.06)" };
      default:
        return {};
    }
  };

  const getLineRotation = (position: string) => {
    return position === "top-left"
      ? "-45deg"
      : position === "top-right"
      ? "45deg"
      : position === "bottom-left"
      ? "-135deg"
      : "135deg";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white flex flex-col">
      {/* Premium Left-to-Right Gradient: White to Blue */}
      <div className="absolute inset-0 z-0" style={{ 
        background: "linear-gradient(105deg, #ffffff 0%, #f0f9ff 35%, #3b82f6 75%, #1d4ed8 100%)" 
      }}>
        {/* Soft atmospheric glows */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/60 blur-[120px] -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[150px] translate-x-1/4" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-4xl">
            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-semibold mb-3" style={{ color: primary }}>
                {companyName}
                <span
                  className="block text-3xl md:text-4xl font-light mt-2"
                  style={{ color: `${primary}e6` }}
                >
                  Gifting
                </span>
              </h1>
              <p className="text-sm tracking-widest uppercase font-medium" style={{ color: `${primary}a6` }}>
                Modern • Secure • Enterprise
              </p>
            </div>

            {/* Interactive Logo with Options */}
            <div className="relative flex items-center justify-center my-16">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-96 h-96 rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.2) 0%, transparent 60%)," +
                      "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                    opacity: 0.8,
                  }}
                />
              </div>

              {/* Connection Lines */}
              <div className="absolute inset-0">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="absolute w-32 h-[2px] transition-all duration-300"
                    style={{
                      top: "50%",
                      left: "50%",
                      backgroundColor:
                        hoveredOption === option.id ? accent : "rgba(0,0,0,0.08)",
                      transform: `rotate(${getLineRotation(option.position)}) translateX(-50%)`,
                      transformOrigin: "left center",
                      boxShadow: hoveredOption === option.id ? `0 0 18px ${accent}44` : "none",
                      opacity: hoveredOption ? (hoveredOption === option.id ? 1 : 0.35) : 1,
                    }}
                  />
                ))}
              </div>

              {/* Central Logo Area */}
              <div
                className="relative z-10 rounded-2xl p-8 w-80 h-80 flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  border: "1px solid rgba(0,0,0,0.05)",
                  background: "rgba(255,255,255,0.4)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                }}
              >
                <div className="text-center">
                  <img
                    src={logo}
                    alt={`${companyName} Logo`}
                    className="w-44 h-44 object-contain mx-auto mb-3"
                    style={{
                      filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))",
                    }}
                  />
                  <div
                    className="mx-auto mt-2 h-[2px] w-20 rounded-full"
                    style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accent}44` }}
                  />
                </div>
              </div>

              {/* Option Cards */}
              {options.map((option) => {
                const isActive = hoveredOption === option.id;
                const isDimmed = hoveredOption && hoveredOption !== option.id;

                return (
                  <div
                    key={option.id}
                    className={getPositionStyles(option.position)}
                    style={{
                      ...getHoverEffect(option.id, option.position),
                      opacity: isDimmed ? 0.55 : 1,
                    }}
                    onMouseEnter={() => setHoveredOption(option.id)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <Button
                      className="w-48 h-48 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center p-4"
                      onClick={() => setLocation(option.path)}
                      style={{
                        border: isActive ? `2px solid ${accent}` : "1px solid rgba(0,0,0,0.12)",
                        background: isActive
                          ? `linear-gradient(135deg, rgba(255,255,255,0.8), ${accent}11)`
                          : "rgba(255,255,255,0.4)",
                        color: primary,
                        backdropFilter: "blur(15px)",
                        boxShadow: isActive
                          ? `0 18px 50px rgba(0,0,0,0.12), 0 0 30px ${accent}22`
                          : "0 10px 30px rgba(0,0,0,0.05)",
                        transform: isActive ? "scale(1.02)" : undefined,
                      }}
                    >
                      <div className="text-center space-y-2 w-full">
                        <h3 className="text-base font-semibold leading-tight line-clamp-2 break-words">
                          {option.title}
                        </h3>
                        <p className="text-xs leading-relaxed line-clamp-3 break-words font-medium" style={{ color: `${primary}cc` }}>
                          {option.description}
                        </p>

                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mt-2 transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? accent : "rgba(0,0,0,0.05)",
                            boxShadow: isActive ? `0 0 18px ${accent}44` : "none",
                          }}
                        >
                          <ArrowRight
                            className="h-4 w-4 transition-all duration-300"
                            style={{
                              color: isActive ? "#FFFFFF" : accent,
                              transform: isActive ? "translateX(2px)" : "none",
                            }}
                          />
                        </div>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
