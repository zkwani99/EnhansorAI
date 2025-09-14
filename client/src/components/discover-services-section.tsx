import { ArrowRight, Zap, Image, Video, Sparkles } from "lucide-react";

export default function DiscoverServicesSection() {
  const services = [
    {
      id: "image-enhancement",
      icon: <Sparkles className="w-8 h-8" />,
      title: "Image Enhancement",
      description: "Transform your images with AI-powered upscaling, noise reduction, and quality enhancement.",
      features: ["4K Upscaling", "Noise Reduction", "Detail Enhancement"],
      href: "/enhance"
    },
    {
      id: "text-to-image",
      icon: <Image className="w-8 h-8" />,
      title: "Text-to-Image",
      description: "Create stunning visuals from simple text descriptions using advanced AI models.",
      features: ["Multiple Art Styles", "High Resolution", "Custom Prompts"],
      href: "/generate"
    },
    {
      id: "image-to-video",
      icon: <Video className="w-8 h-8" />,
      title: "Image-to-Video",
      description: "Bring static images to life with AI-generated animations and motion effects.",
      features: ["Smooth Animation", "Multiple Styles", "HD Output"],
      href: "/image-to-video"
    },
    {
      id: "text-to-video",
      icon: <Zap className="w-8 h-8" />,
      title: "Text-to-Video",
      description: "Generate complete videos from text descriptions with AI-powered scene creation.",
      features: ["Full HD Videos", "Scene Generation", "Custom Duration"],
      href: "/video"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
            Discover Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive AI-powered creative tools designed to bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:bg-white dark:hover:bg-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              data-testid={`service-card-${service.id}`}
            >
              <div className="text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={service.href}
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group-hover:translate-x-1"
                data-testid={`service-cta-${service.id}`}
              >
                Try Now
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}