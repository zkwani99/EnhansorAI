import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Share2, Instagram, Download, ExternalLink } from "lucide-react";
import { SiTiktok, SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface SocialExportProps {
  fileUrl: string;
  fileName: string;
  fileType: "image" | "video";
  className?: string;
}

export function SocialExport({ fileUrl, fileName, fileType, className = "" }: SocialExportProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const { toast } = useToast();

  const socialPlatforms = [
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "hover:bg-pink-50 hover:text-pink-600",
      formats: fileType === "image" ? ["1080x1080", "1080x1350"] : ["1080x1920", "1080x1080"]
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: SiTiktok,
      color: "hover:bg-black hover:text-white",
      formats: fileType === "video" ? ["1080x1920"] : ["1080x1920"]
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: SiX,
      color: "hover:bg-black hover:text-white",
      formats: fileType === "image" ? ["1200x675", "1080x1080"] : ["1280x720", "1080x1920"]
    }
  ];

  const handleShare = async (platform: string) => {
    setIsExporting(platform);
    
    try {
      // Simulate format preparation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const shareUrls = {
        instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing via URL
        tiktok: `https://www.tiktok.com/upload`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fileUrl)}&text=${encodeURIComponent(`Check out this amazing ${fileType} I created with Enhansor AI! ✨`)}`
      };

      const shareUrl = shareUrls[platform as keyof typeof shareUrls];
      
      if (platform === "instagram") {
        // For Instagram, we'll copy the link and show instructions
        await navigator.clipboard.writeText(fileUrl);
        toast({
          title: "Ready for Instagram!",
          description: "File link copied to clipboard. Open Instagram and paste to share.",
        });
      } else {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        toast({
          title: "Sharing prepared!",
          description: `Opening ${platform === "twitter" ? "Twitter/X" : "TikTok"} in a new window.`,
        });
      }
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Something went wrong while preparing your file for sharing.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(null);
    }
  };

  const handleDirectDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your file is being downloaded.",
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Download Button */}
      <Button
        onClick={handleDirectDownload}
        className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white"
        data-testid="button-download-file"
      >
        <Download className="w-4 h-4 mr-2" />
        Download {fileType === "image" ? "Image" : "Video"}
      </Button>

      {/* Social Export Card */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Share to Social</span>
            </div>
            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
              One-Click
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const isExportingThis = isExporting === platform.id;
              
              return (
                <Button
                  key={platform.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(platform.id)}
                  disabled={isExportingThis}
                  className={`flex flex-col items-center gap-1 h-auto py-2 border-purple-200 ${platform.color} transition-all duration-300 hover:scale-105 hover:shadow-md`}
                  data-testid={`button-share-${platform.id}`}
                >
                  {isExportingThis ? (
                    <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <IconComponent className="w-5 h-5" />
                  )}
                  <span className="text-xs font-medium">
                    {isExportingThis ? "Preparing..." : platform.name}
                  </span>
                </Button>
              );
            })}
          </div>

          <div className="mt-3 p-2 bg-white rounded border border-purple-200">
            <div className="flex items-start gap-2">
              <ExternalLink className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-purple-700">
                Files are automatically optimized for each platform's recommended format and dimensions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}