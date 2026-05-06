// src/pages/home.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

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
      path: "/dashboard",
    },
    {
      id: "special-occasions",
      title: "Special Occasions",
      description: "Gifts for memorable moments",
      path: "/special-occasions",
    },
  ];

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

            {/* Options Navigation */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-12 my-16 z-20">
              {/* Background Decorative Glow */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div
                  className="w-full max-w-2xl h-64 rounded-full blur-[100px]"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)",
                  }}
                />
              </div>

              {options.map((option) => {
                const isActive = hoveredOption === option.id;
                const isDimmed = hoveredOption && hoveredOption !== option.id;

                return (
                  <div
                    key={option.id}
                    className="relative transition-all duration-500 ease-out"
                    style={{
                      opacity: isDimmed ? 0.6 : 1,
                      transform: isActive ? "scale(1.05) translateY(-5px)" : "scale(1)",
                    }}
                    onMouseEnter={() => setHoveredOption(option.id)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <Button
                      className="w-64 h-64 rounded-3xl transition-all duration-300 flex flex-col items-center justify-center p-8 group"
                      onClick={() => setLocation(option.path)}
                      style={{
                        border: isActive ? `2px solid ${accent}` : "1px solid rgba(0,0,0,0.08)",
                        background: isActive
                          ? `linear-gradient(135deg, rgba(255,255,255,0.9), ${accent}15)`
                          : "rgba(255,255,255,0.7)",
                        color: primary,
                        backdropFilter: "blur(20px)",
                        boxShadow: isActive
                          ? `0 25px 60px rgba(0,0,0,0.12), 0 0 40px ${accent}33`
                          : "0 15px 40px rgba(0,0,0,0.06)",
                      }}
                    >
                      <div className="text-center space-y-4 w-full">
                        <h3 className="text-2xl font-bold leading-tight line-clamp-2 break-words text-slate-900">
                          {option.title}
                        </h3>
                        <p className="text-sm leading-relaxed line-clamp-3 break-words font-medium" style={{ color: `${primary}cc` }}>
                          {option.description}
                        </p>

                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mt-6 transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? accent : "rgba(0,0,0,0.05)",
                            boxShadow: isActive ? `0 0 20px ${accent}55` : "none",
                          }}
                        >
                          <ArrowRight
                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                            style={{
                              color: isActive ? "#FFFFFF" : accent,
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
