import { useState } from "react";
import { Menu, X, User, LogOut, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirectToService } from "@/lib/authRedirect";
import { isReviewMode } from "@/lib/reviewMode";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/supabaseAuth";
import { useTheme } from "@/components/theme-provider";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/image_1758291503731.png";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [location, navigate] = useLocation();


  const handleNavClick = (link: any) => {
    if (link.route) {
      // During review mode, allow navigation to service pages without authentication
      if (isReviewMode()) {
        navigate(`/${link.route}`);
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
        return;
      }
      
      // Check if user is authenticated before navigating to service pages
      if (isAuthenticated) {
        // User is logged in, navigate directly to the service page
        navigate(`/${link.route}`);
        // Jump directly to top of the new page (no animation)
        window.scrollTo(0, 0);
      } else {
        // User not logged in, redirect to auth flow
        redirectToService(link.route);
      }
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
      { name: "Image Enhancement", route: "image-enhancement", id: "image-enhancement" },
      { name: "AI Image Generator", route: "text-to-image", id: "ai-generator" },
      { name: "AI Video Generator", route: "text-to-video", id: "video-generator" },
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
    <nav className="bg-white dark:bg-black shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-600 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Lorepic" 
                className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-white dark:bg-black rounded-sm"
                data-testid="logo-home-link"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {/* Tools Dropdown */}
              <DropdownMenu open={openDropdown === 'tools'} onOpenChange={(open) => setOpenDropdown(open ? 'tools' : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 group"
                    onMouseEnter={() => setOpenDropdown('tools')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Tools
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-600"
                  onMouseEnter={() => setOpenDropdown('tools')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {navigationGroups.tools.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200 ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : ''}`}
                      data-testid={`dropdown-tools-${item.id}`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Explore Dropdown */}
              <DropdownMenu open={openDropdown === 'explore'} onOpenChange={(open) => setOpenDropdown(open ? 'explore' : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 group"
                    onMouseEnter={() => setOpenDropdown('explore')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Explore
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-48 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-600"
                  onMouseEnter={() => setOpenDropdown('explore')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {navigationGroups.explore.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200 ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : ''}`}
                      data-testid={`dropdown-explore-${item.id}`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Pricing - CTA Button */}
              <Link href="/pricing">
                <button
                  className={`bg-gradient-to-b from-fuchsia-500 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:from-fuchsia-600 hover:to-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 ${location.includes('pricing') ? 'ring-2 ring-fuchsia-400' : ''}`}
                  data-testid="nav-pricing-cta"
                >
                  Pricing
                </button>
              </Link>

              {/* Developers Dropdown */}
              <DropdownMenu open={openDropdown === 'developers'} onOpenChange={(open) => setOpenDropdown(open ? 'developers' : null)}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 group"
                    onMouseEnter={() => setOpenDropdown('developers')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Developers
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-48 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-600"
                  onMouseEnter={() => setOpenDropdown('developers')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {navigationGroups.developers.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200 ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : ''}`}
                      data-testid={`dropdown-developers-${item.id}`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Account Dropdown (only if authenticated) */}
              {isAuthenticated && (
                <DropdownMenu open={openDropdown === 'account'} onOpenChange={(open) => setOpenDropdown(open ? 'account' : null)}>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 group"
                      onMouseEnter={() => setOpenDropdown('account')}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      Account
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="w-48 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-600"
                    onMouseEnter={() => setOpenDropdown('account')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {navigationGroups.account.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={async () => {
                          if (item.action === 'logout') {
                            await signOut();
                            window.location.href = '/';
                          } else {
                            handleNavClick(item);
                          }
                        }}
                        className={`cursor-pointer hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200 ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : ''}`}
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
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => import('@/lib/authRedirect').then(({ startGoogleSignIn }) => startGoogleSignIn())}
                data-testid="button-sign-in"
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-b from-fuchsia-500 to-purple-700 text-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                onClick={() => import('@/lib/authRedirect').then(({ startGoogleSignIn }) => startGoogleSignIn())}
                data-testid="button-sign-up"
              >
                Sign Up
              </Button>
              
              {/* Theme Toggle - For non-authenticated users */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 transition-all duration-200"
                data-testid="button-theme-toggle"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
            </div>
          )}
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-600 bg-white dark:bg-black">
            <div className="flex flex-col space-y-1">
              {/* Tools Section */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Tools</h3>
                {navigationGroups.tools.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200'}`}
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
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200'}`}
                    data-testid={`mobile-nav-explore-${item.id}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Pricing */}
              <div className="px-3 py-2">
                <Link href="/pricing">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full bg-gradient-to-b from-fuchsia-500 to-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:from-fuchsia-600 hover:to-purple-800 ${location.includes('pricing') ? 'ring-2 ring-fuchsia-400' : ''}`}
                    data-testid="mobile-nav-pricing-cta"
                  >
                    Pricing
                  </button>
                </Link>
              </div>

              {/* Developers Section */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Developers</h3>
                {navigationGroups.developers.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200'}`}
                    data-testid={`mobile-nav-developers-${item.id}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Theme Toggle Section */}
              <div className="px-3 py-2">
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="w-full text-gray-600 dark:text-gray-400 hover:text-purple-700 hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200 dark:hover:bg-purple-900/20 justify-start"
                  data-testid="mobile-button-theme-toggle"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
              </div>

              {/* Account or Auth Section */}
              <div className="px-3 py-2 pt-4 border-t border-gray-100 dark:border-gray-600 mt-4">
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
                        className={`flex items-center w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${isActiveRoute(item.route || '') ? 'bg-fuchsia-50 text-fuchsia-500 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-fuchsia-500 dark:hover:text-purple-400 hover:bg-fuchsia-50 dark:hover:bg-purple-900/20 dark:text-gray-200'}`}
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
                      className="bg-gradient-to-b from-fuchsia-500 to-purple-700 text-white justify-start"
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
