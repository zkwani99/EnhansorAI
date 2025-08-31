import { useState } from "react";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirectToService } from "@/lib/authRedirect";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [location] = useLocation();

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

  // Navigation structure with dropdowns
  const navigationGroups = {
    tools: [
      { name: "Image Enhancement", route: "enhance", id: "image-enhancement" },
      { name: "AI Image Generator", route: "generate", id: "ai-generator" },
      { name: "AI Video Generator", route: "video", id: "video-generator" },
      { name: "AI Image-to-Video", route: "image-to-video", id: "image-to-video" },
    ],
    explore: [
      { name: "Gallery", id: "gallery", route: undefined },
      { name: "Templates", id: "templates", route: undefined },
    ],
    developers: [
      { name: "API Docs", route: "api", id: "api-docs" },
      { name: "API Key", route: "api-key", id: "api-key" },
    ],
    account: isAuthenticated ? [
      { name: "Dashboard", route: "dashboard", id: "dashboard" },
      { name: "Logout", action: "logout", id: "logout", route: undefined },
    ] : [],
  };

  const isActiveRoute = (route: string) => {
    if (!route) return false;
    return location.includes(route) || location === `/${route}`;
  };

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
            <div className="ml-10 flex items-center space-x-8">
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-all duration-200 group">
                    Tools
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white shadow-lg border border-gray-200">
                  {navigationGroups.tools.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer hover:bg-purple-50 ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-600 font-semibold' : ''}`}
                      data-testid={`dropdown-tools-${item.id}`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Explore Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-all duration-200 group">
                    Explore
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white shadow-lg border border-gray-200">
                  {navigationGroups.explore.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer hover:bg-purple-50 ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-600 font-semibold' : ''}`}
                      data-testid={`dropdown-explore-${item.id}`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Pricing - CTA Button */}
              <button
                onClick={() => handleNavClick({ id: 'pricing' })}
                className={`bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 ${location.includes('pricing') ? 'ring-2 ring-purple-300' : ''}`}
                data-testid="nav-pricing-cta"
              >
                Pricing
              </button>

              {/* Developers Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-all duration-200 group">
                    Developers
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white shadow-lg border border-gray-200">
                  {navigationGroups.developers.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer hover:bg-purple-50 ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-600 font-semibold' : ''}`}
                      data-testid={`dropdown-developers-${item.id}`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Account Dropdown (only if authenticated) */}
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-gray-600 hover:text-purple-700 px-3 py-2 text-sm font-medium transition-all duration-200 group">
                      Account
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white shadow-lg border border-gray-200">
                    {navigationGroups.account.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => {
                          if (item.action === 'logout') {
                            window.location.href = '/api/logout';
                          } else {
                            handleNavClick(item);
                          }
                        }}
                        className={`cursor-pointer hover:bg-purple-50 ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-600 font-semibold' : ''}`}
                        data-testid={`dropdown-account-${item.id}`}
                      >
                        {item.name === 'Logout' && <LogOut className="w-4 h-4 mr-2" />}
                        {item.name === 'Dashboard' && <User className="w-4 h-4 mr-2" />}
                        {item.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          
          {/* Auth Buttons (only for non-authenticated users) */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-sign-in"
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-sign-up"
              >
                Sign Up
              </Button>
            </div>
          )}
          
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
            <div className="flex flex-col space-y-1">
              {/* Tools Section */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tools</h3>
                {navigationGroups.tools.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'}`}
                    data-testid={`mobile-nav-tools-${item.id}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Explore Section */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Explore</h3>
                {navigationGroups.explore.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'}`}
                    data-testid={`mobile-nav-explore-${item.id}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Pricing */}
              <div className="px-3 py-2">
                <button
                  onClick={() => handleNavClick({ id: 'pricing' })}
                  className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:from-purple-700 hover:to-purple-800 ${location.includes('pricing') ? 'ring-2 ring-purple-300' : ''}`}
                  data-testid="mobile-nav-pricing-cta"
                >
                  Pricing
                </button>
              </div>

              {/* Developers Section */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Developers</h3>
                {navigationGroups.developers.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'}`}
                    data-testid={`mobile-nav-developers-${item.id}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Account or Auth Section */}
              <div className="px-3 py-2 pt-4 border-t border-gray-100 mt-4">
                {isAuthenticated ? (
                  <>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Account</h3>
                    {navigationGroups.account.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.action === 'logout') {
                            window.location.href = '/api/logout';
                          } else {
                            handleNavClick(item);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'}`}
                        data-testid={`mobile-nav-account-${item.id}`}
                      >
                        {item.name === 'Logout' && <LogOut className="w-4 h-4 mr-2" />}
                        {item.name === 'Dashboard' && <User className="w-4 h-4 mr-2" />}
                        {item.name}
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-900 justify-start"
                      onClick={() => {
                        window.location.href = '/api/login';
                        setIsMobileMenuOpen(false);
                      }}
                      data-testid="mobile-button-sign-in"
                    >
                      Sign In
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white justify-start"
                      onClick={() => {
                        window.location.href = '/api/login';
                        setIsMobileMenuOpen(false);
                      }}
                      data-testid="mobile-button-sign-up"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
