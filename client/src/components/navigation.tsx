import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirectToService } from "@/lib/authRedirect";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleNavClick = (link: any) => {
    if (link.route) {
      // Navigate to service page with auth
      redirectToService(link.route);
    } else {
      // Scroll to section on current page
      const element = document.getElementById(link.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Image Enhancement", id: "image-enhancement", route: "enhance" },
    { name: "AI Image Generator", id: "ai-generator", route: "generate" },
    { name: "AI Video Generator", id: "video-generator", route: "video" },
    { name: "AI Image-to-Video", id: "image-to-video", route: "image-to-video" },
    { name: "Gallery", id: "gallery" },
    { name: "API / Developers", id: "api", route: "api" },
    { name: "Pricing", id: "pricing" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold gradient-text">
              Enhansor
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="text-gray-600 hover:text-primary-blue px-3 py-2 text-sm font-medium transition-colors"
                  data-testid={`nav-link-${link.id}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                    data-testid="button-dashboard"
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                  onClick={() => window.location.href = '/api/logout'}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-sign-in"
                >
                  Sign In
                </Button>
                <Button
                  className="bg-gradient-to-r from-primary-blue to-primary-purple text-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  onClick={() => window.location.href = '/api/login'}
                  data-testid="button-sign-up"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="text-gray-600 hover:text-primary-blue px-3 py-2 text-sm font-medium transition-colors text-left"
                  data-testid={`mobile-nav-link-${link.id}`}
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-900 justify-start w-full"
                        data-testid="mobile-button-dashboard"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-900 justify-start"
                      onClick={() => window.location.href = '/api/logout'}
                      data-testid="mobile-button-logout"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-900 justify-start"
                      onClick={() => window.location.href = '/api/login'}
                      data-testid="mobile-button-sign-in"
                    >
                      Sign In
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-primary-blue to-primary-purple text-white justify-start"
                      onClick={() => window.location.href = '/api/login'}
                      data-testid="mobile-button-sign-up"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
