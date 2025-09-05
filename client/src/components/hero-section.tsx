import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Video, Film } from "lucide-react";
import { redirectToService } from "@/lib/authRedirect";

export default function HeroSection() {
  const services = [
    {
      id: "enhance",
      title: "Enhance My Image",
      subtitle: "Upscale & restore photos",
      icon: Sparkles,
      color: "bg-green-500"
    },
    {
      id: "generate",
      title: "Generate Image from Text",
      subtitle: "AI art & visuals",
      icon: Palette,
      color: "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"
    },
    {
      id: "video",
      title: "Create Video from Text or Image",
      subtitle: "AI-powered short clips",
      icon: Video,
      color: "bg-purple-600"
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    redirectToService(serviceId);
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 transition-colors duration-300">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-computer-tower-mother-board-being-assembled-5014-large.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay for text visibility - reduced opacity for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black/70"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Turn <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">Ideas</span> into Visual <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">Magic</span> — Instantly.
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Upscale low-res images, create stunning AI art, and transform text or photos into cinematic videos — all in one seamless platform powered by cutting-edge AI.
          </p>
          
          {/* Service Buttons - 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Top row */}
            <Button 
              size="lg"
              onClick={() => handleServiceClick('enhance')}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white px-8 py-5 rounded-xl text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-purple-600"
              data-testid="button-enhance-image"
            >
              <Sparkles className="mr-3 h-5 w-5" />
              Enhance Image
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('generate')}
              className="border-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-black text-gray-800 dark:text-gray-100 px-8 py-5 rounded-xl text-lg font-bold shadow-md hover:border-purple-700 hover:text-purple-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-generate-image"
            >
              <Palette className="mr-3 h-5 w-5" />
              Text to Image
            </Button>
            {/* Bottom row */}
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('video')}
              className="border-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-black text-gray-800 dark:text-gray-100 px-8 py-5 rounded-xl text-lg font-bold shadow-md hover:border-purple-700 hover:text-purple-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-create-video"
            >
              <Video className="mr-3 h-5 w-5" />
              Text to Video
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleServiceClick('image-to-video')}
              className="border-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-black text-gray-800 dark:text-gray-100 px-8 py-5 rounded-xl text-lg font-bold shadow-md hover:border-purple-700 hover:text-purple-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              data-testid="button-create-video-from-image"
            >
              <Film className="mr-3 h-5 w-5" />
              Image to Video
            </Button>
          </div>
          
          {/* Tagline under buttons */}
          <div className="mt-8">
            <p className="text-white/90 text-lg font-medium drop-shadow-lg">
              Start Creating for Free. No Credit Card Needed
            </p>
          </div>
          
          {/* Hero Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent" data-testid="stat-images-processed">2K+</div>
              <div className="text-white/80 mt-1 drop-shadow-sm">Images Enhanced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent" data-testid="stat-videos-generated">1K+</div>
              <div className="text-white/80 mt-1 drop-shadow-sm">Videos Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent" data-testid="stat-happy-users">500+</div>
              <div className="text-white/80 mt-1 drop-shadow-sm">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}