import { Sparkles, CreditCard, HelpCircle, MessageCircle, FileText, BookOpen, Code, FileText as GuideIcon } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/image_1758291503731.png";

export default function Footer() {
  const helpfulLinks = [
    { name: "Pricing Plans", icon: CreditCard, action: () => window.location.href = "/pricing" },
    { name: "How Credits Work", icon: FileText, action: () => window.location.href = "/pricing#credits-breakdown" },
    { name: "FAQ", icon: HelpCircle, action: () => scrollToSection("faq") },
    { name: "Contact Support", icon: MessageCircle, action: () => window.location.href = "mailto:support@lorepic.com" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const companyLinks = [
    { name: "About Us", href: "/About-Us" },
    { name: "Privacy Policy", href: "/Privacy-Policy" },
    { name: "Terms of Service", href: "/Terms-of-Service" },
    { name: "Refund Policy", href: "/Refund-Policy" },
  ];

  const resourceLinks = [
    { name: "Blog / Updates", icon: BookOpen, href: "/blog" },
    { name: "Guides & Tutorials", icon: GuideIcon, href: "/guides" },
    { name: "API Documentation", icon: Code, href: "/api-docs" },
  ];


  return (
    <footer className="bg-gray-50 dark:bg-black py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-3">
              <Link href="/">
                <img 
                  src={logoImage} 
                  alt="Lorepic" 
                  className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  data-testid="footer-logo-home-link"
                />
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Lorepic — AI tools to enhance, generate, and create. Smarter visuals, faster.
            </p>
          </div>
          
          {/* Helpful Links */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gradient-to-b from-fuchsia-500 to-purple-700 rounded-full flex items-center justify-center mr-2">
                <Sparkles className="text-white" size={12} />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Helpful Links</h4>
            </div>
            <ul className="space-y-2">
              {helpfulLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name} className="flex items-center cursor-pointer" onClick={link.action}>
                    <IconComponent className="text-fuchsia-500 mr-2" size={14} />
                    <span className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{link.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gradient-to-b from-fuchsia-500 to-purple-700 rounded-full flex items-center justify-center mr-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Company</h4>
            </div>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-gray-100 transition-colors cursor-pointer"
                      data-testid={`footer-link-company-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gradient-to-b from-fuchsia-500 to-purple-700 rounded-full flex items-center justify-center mr-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Resources</h4>
            </div>
            <ul className="space-y-2">
              {resourceLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <div className="flex items-center cursor-pointer">
                        <IconComponent className="text-fuchsia-500 mr-2" size={14} />
                        <span className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">{link.name}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© 2025 Lorepic. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}