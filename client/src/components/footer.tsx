import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const serviceLinks = [
    { name: "Image Enhancement", href: "#image-enhancement" },
    { name: "Text-to-Image AI", href: "#ai-generator" },
    { name: "Text-to-Video AI", href: "#video-generator" },
    { name: "API Access", href: "#" },
    { name: "Batch Processing", href: "#" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Status Page", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "YouTube", href: "#", icon: Youtube },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // External link - would typically open in new tab
      console.log("Navigate to:", href);
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log("Social link clicked:", platform);
    // TODO: Navigate to social media
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="text-2xl font-bold gradient-text mb-4">
              Enhansor
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering creators with cutting-edge AI technology for image enhancement and content generation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social.name.toLowerCase())}
                    className="text-gray-400 hover:text-white transition-colors"
                    data-testid={`button-social-${social.name.toLowerCase()}`}
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <IconComponent size={24} />
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                    data-testid={`footer-link-service-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                    data-testid={`footer-link-company-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                    data-testid={`footer-link-support-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Enhansor. All rights reserved. Made with ❤️ for creators worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
