import { Sparkles, Image as ImageIcon, Zap, Sun } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const enhancementTools = [
    { name: "Auto Enhance", icon: Sparkles },
    { name: "Old Photo Restore", icon: ImageIcon },
    { name: "AI Upscaling", icon: Zap },
    { name: "Low Light Boost", icon: Sun },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];


  return (
    <footer className="bg-gray-50 dark:bg-black py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-lg flex items-center justify-center mr-2">
                <Sparkles className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Lorepic</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Lorepic — AI tools to enhance, generate, and create. Smarter visuals, faster.
            </p>
          </div>
          
          {/* Enhancement Tools */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full flex items-center justify-center mr-2">
                <Sparkles className="text-white" size={12} />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Enhancement Tools</h4>
            </div>
            <ul className="space-y-2">
              {enhancementTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <li key={tool.name} className="flex items-center">
                    <IconComponent className="text-purple-700 mr-2" size={14} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{tool.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-full flex items-center justify-center mr-2">
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
          
          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact & Support</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              support@lorepic.com
            </div>
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