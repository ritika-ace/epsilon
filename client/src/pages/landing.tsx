import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import element5 from "../../../attached_assets/element_5.png";

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

export default function Landing() {
  const [, setLocation] = useLocation();

  const { data: branding } = useQuery<Branding>({
    queryKey: ["/api/admin/branding"],
  });

  // Virtusa-like defaults if branding not set
  const primary = branding?.primaryColor || "#000000"; // Sleek Black
  const accent = branding?.accentColor || "#3b82f6"; // Attractive Blue

  const logoUrl = branding?.logoUrl || null;
  const companyName = branding?.companyName || "Virtusa";

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Premium Left-to-Right Gradient: White to Blue */}
      <div className="absolute inset-0 z-0" style={{ 
        background: "linear-gradient(105deg, #ffffff 0%, #f0f9ff 35%, #3b82f6 75%, #1d4ed8 100%)" 
      }}>
        {/* Soft atmospheric glows */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white/60 blur-[120px] -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[150px] translate-x-1/4" />
        
        {/* Subtle grid pattern for technical feel */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${companyName} Logo`}
            className="h-10 md:h-12"
            data-testid="img-sun-logo"
          />
        ) : (
          <Building
            className="h-10 w-10 md:h-12 md:w-12"
            style={{ color: primary }}
            data-testid="img-sun-logo"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <p
                className="text-sm tracking-widest uppercase mb-4 font-semibold"
                style={{ color: `${primary}80` }}
              >
                Enterprise Gifting Platform
              </p>

              <h1
                className="text-5xl lg:text-6xl font-semibold mb-3 leading-tight"
                style={{ color: primary }}
                data-testid="text-landing-title"
              >
                Celebrate
              </h1>

              <h2
                className="text-5xl lg:text-6xl font-semibold mb-6 leading-tight"
                style={{ color: accent }}
                data-testid="text-landing-subtitle"
              >
                Thoughtful Gifting
              </h2>

              <p
                className="text-lg md:text-xl mb-10 font-medium"
                style={{ color: `${primary}cc` }}
                data-testid="text-landing-tagline"
              >
                Gifting that articulates joy every time.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="rounded-xl border border-black/10 bg-white/40 p-4 backdrop-blur-md shadow-lg">
                  <p className="text-xs mb-2 font-medium" style={{ color: `${primary}99` }}>
                    For All
                  </p>
                  <p className="text-2xl font-bold" style={{ color: accent }}>
                    Seasons
                  </p>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/40 p-4 backdrop-blur-md shadow-lg">
                  <p className="text-xs mb-2 font-medium" style={{ color: `${primary}99` }}>
                    For All
                  </p>
                  <p className="text-2xl font-bold" style={{ color: accent }}>
                    Reasons
                  </p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full max-w-md h-14 text-lg rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300"
                onClick={() => setLocation("/login")}
                data-testid="button-login-landing"
                style={{
                  backgroundColor: accent,
                  color: "#FFFFFF",
                  border: "none",
                }}
              >
                Login
              </Button>

              <p className="mt-4 text-xs font-medium" style={{ color: `${primary}80` }}>
                Secure access • OTP verification • Domain controls
              </p>
            </div>

            {/* Illustration Column */}
            <div className="hidden md:block relative">
              <div className="relative z-10 animate-in fade-in slide-in-from-right duration-1000">
                <img
                  src={element5}
                  alt="Gifting Illustration"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.2)] transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
              {/* Decorative Glow behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 blur-[120px] rounded-full -z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
