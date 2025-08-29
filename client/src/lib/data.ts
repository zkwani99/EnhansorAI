// Pricing data for all services
export const pricingPlans = {
  image: {
    title: "Image Enhancement Pricing",
    description: "Professional image upscaling and enhancement services",
    plans: [
      {
        id: "free-image",
        name: "Free",
        price: "$0",
        period: "/month",
        isFree: true,
        isPopular: false,
        buttonText: "Start Free",
        features: [
          { text: "25 images per month", included: true },
          { text: "Basic 2× upscaling", included: true },
          { text: "Web upload only", included: true },
          { text: "Watermarked output", included: false },
          { text: "Standard processing queue", included: true }
        ]
      },
      {
        id: "starter-image",
        name: "Starter",
        price: "$15",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "600 images per month", included: true },
          { text: "HD upscaling (up to 4×)", included: true },
          { text: "No watermark", included: true },
          { text: "Basic denoise", included: true },
          { text: "Standard support", included: true },
          { text: "Email support", included: true }
        ]
      },
      {
        id: "growth-image",
        name: "Growth",
        price: "$55",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        features: [
          { text: "2000 images per month", included: true },
          { text: "High-res upscaling (up to 6×) with advanced denoise + sharpen", included: true, tooltip: "Higher resolution outputs possible depending on original image size." },
          { text: "Batch upload", included: true },
          { text: "Faster queue priority", included: true },
          { text: "Multi-format export (JPG/PNG)", included: true }
        ]
      },
      {
        id: "business-image",
        name: "Business",
        price: "$140",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "5000 images per month", included: true },
          { text: "Ultra-HD upscaling (up to 6×) with advanced enhancement", included: true, tooltip: "Higher resolution outputs possible depending on original image size." },
          { text: "Face restore + advanced enhancement", included: true },
          { text: "API access", included: true },
          { text: "Batch processing", included: true },
          { text: "Priority support", included: true },
          { text: "Commercial use license", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Monthly Images",
        values: ["25", "600", "2000", "5000"]
      },
      {
        name: "Upscaling Quality",
        values: ["Basic 2× upscaling", "HD upscaling (up to 4×)", "High-res upscaling (up to 6×)", "Ultra-HD upscaling (up to 6×)"]
      },
      {
        name: "Watermark",
        values: ["Watermarked output", "No watermark", "No watermark", "No watermark"]
      },
      {
        name: "Processing Queue",
        values: ["Standard processing queue", "Standard support", "Faster queue priority", "Priority support"]
      },
      {
        name: "Batch Processing",
        values: [false, false, "Batch upload", "Batch processing"]
      },
      {
        name: "API Access",
        values: [false, false, false, true]
      },
      {
        name: "Support",
        values: ["—", "Email support", "—", "Priority support"]
      },
      {
        name: "Commercial License",
        values: [false, false, false, true]
      }
    ]
  },
  ai: {
    title: "Text-to-Image AI Pricing",
    description: "Create stunning artwork from text descriptions",
    plans: [
      {
        id: "free-ai",
        name: "Free",
        price: "$0",
        period: "/month",
        isFree: true,
        isPopular: false,
        buttonText: "Start Free",
        features: [
          { text: "20 images/month (all 512×512 px)", included: true },
          { text: "Basic prompt styles", included: true },
          { text: "Standard processing queue", included: true },
          { text: "Watermarked output", included: false }
        ]
      },
      {
        id: "starter-ai",
        name: "Starter",
        price: "$15",
        period: "/month",
        pricePerImage: "$0.025 per image",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "600 images per month", included: true },
          { text: "600 images/month split across resolutions:", included: true },
          { text: "• 300 × 512×512 px", included: true },
          { text: "• 180 × 1024×1024 px", included: true },
          { text: "• 120 × 2048×2048 px", included: true },
          { text: "HD + Ultra HD generation", included: true },
          { text: "No watermark", included: true },
          { text: "Advanced prompt styles", included: true },
          { text: "Custom aspect ratios", included: true },
          { text: "Standard queue", included: true },
          { text: "Email support", included: true }
        ]
      },
      {
        id: "growth-ai",
        name: "Growth",
        price: "$55",
        period: "/month",
        pricePerImage: "$0.028 per image",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        features: [
          { text: "2000 images per month", included: true },
          { text: "2000 images/month split across resolutions:", included: true },
          { text: "• 1000 × 512×512 px", included: true },
          { text: "• 600 × 1024×1024 px", included: true },
          { text: "• 300 × 2048×2048 px", included: true },
          { text: "• 100 × 4K (3840×2160 px)", included: true },
          { text: "Ultra HD image generation", included: true },
          { text: "All styles & effects", included: true },
          { text: "Faster queue priority", included: true },
          { text: "Multi-aspect ratios", included: true },
          { text: "Commercial license included", included: true }
        ]
      },
      {
        id: "business-ai",
        name: "Business",
        price: "$140",
        period: "/month",
        pricePerImage: "$0.028 per image",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "5000 images per month", included: true },
          { text: "5000 images/month split across resolutions:", included: true },
          { text: "• 2500 × 512×512 px", included: true },
          { text: "• 1500 × 1024×1024 px", included: true },
          { text: "• 800 × 2048×2048 px", included: true },
          { text: "• 200 × 4K (3840×2160 px)", included: true },
          { text: "Ultra HD image generation", included: true },
          { text: "API access", included: true },
          { text: "Fastest queue priority", included: true },
          { text: "All styles & effects", included: true },
          { text: "Commercial license", included: true },
          { text: "Priority support", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Monthly Images",
        values: ["20", "600", "2000", "5000"]
      },
      {
        name: "512×512 px Images",
        values: ["20 images", "300 images", "1000 images", "2500 images"]
      },
      {
        name: "1024×1024 px Images",
        values: ["—", "180 images", "600 images", "1500 images"]
      },
      {
        name: "2048×2048 px Images",
        values: ["—", "120 images", "300 images", "800 images"]
      },
      {
        name: "4K (3840×2160 px) Images",
        values: ["—", "—", "100 images", "200 images"]
      },
      {
        name: "Prompt Styles",
        values: ["Basic prompt styles", "Advanced prompt styles", "All styles & effects", "All styles & effects"]
      },
      {
        name: "Output Quality",
        values: ["Watermarked output", "HD + Ultra HD, no watermark", "Ultra HD, no watermark", "Ultra HD, no watermark"]
      },
      {
        name: "Processing Queue",
        values: ["Standard processing queue", "Standard queue", "Faster queue priority", "Fastest queue priority"]
      },
      {
        name: "Custom Aspect Ratios",
        values: [false, true, true, true]
      },
      {
        name: "API Access",
        values: [false, false, false, true]
      },
      {
        name: "Commercial License",
        values: [false, false, true, true]
      },
      {
        name: "Support",
        values: ["—", "Email support", "Priority support", "Priority support"]
      }
    ]
  },
  video: {
    title: "Text-to-Video AI Pricing",
    description: "Generate professional videos from text descriptions",
    plans: [
      {
        id: "starter-video",
        name: "Starter",
        price: "$35",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        subtitle: "Best for trying out AI video generation",
        features: [
          { text: "Up to 65 clips per month", included: true },
          { text: "📹 50 clips / month (5s each) at 480p", included: true },
          { text: "📹 10 clips / month (5s each) at 720p", included: true },
          { text: "📹 5 clips / month (5s each) at 1080p", included: true },
          { text: "🎬 Access to AI video editor", included: true },
          { text: "💾 Save & download your videos instantly", included: true },
          { text: "✨ Perfect for creators, students, and small projects", included: true }
        ]
      },
      {
        id: "growth-video",
        name: "Growth",
        price: "$85",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        subtitle: "For regular creators and small teams",
        features: [
          { text: "Up to 175 clips per month", included: true },
          { text: "📹 120 clips / month (5s each) at 480p", included: true },
          { text: "📹 40 clips / month (5s each) at 720p", included: true },
          { text: "📹 15 clips / month (5s each) at 1080p", included: true },
          { text: "⚡ Priority rendering speed", included: true },
          { text: "📁 Larger storage for video projects", included: true },
          { text: "📧 Email support", included: true },
          { text: "🎯 Great for freelancers, and content marketers", included: true }
        ]
      },
      {
        id: "business-video",
        name: "Business",
        price: "$160",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        subtitle: "For businesses with higher content needs",
        features: [
          { text: "Up to 320 clips per month", included: true },
          { text: "📹 200 clips / month (5s each) at 480p", included: true },
          { text: "📹 80 clips / month (5s each) at 720p", included: true },
          { text: "📹 40 clips / month (5s each) at 1080p", included: true },
          { text: "🚀 Priority queue for faster delivery", included: true },
          { text: "👥 Team collaboration (multi-user access)", included: true },
          { text: "🎗️ Priority support", included: true },
          { text: "🏢 Designed for agencies, startups, and brands scaling their video content", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "480p Videos",
        values: ["50 clips/month", "120 clips/month", "200 clips/month"]
      },
      {
        name: "720p Videos",
        values: ["10 clips/month", "40 clips/month", "80 clips/month"]
      },
      {
        name: "1080p Videos",
        values: ["5 clips/month", "15 clips/month", "40 clips/month"]
      },
      {
        name: "Video Length",
        values: ["5 seconds each", "5 seconds each", "5 seconds each"]
      },
      {
        name: "AI Video Editor Access",
        values: [true, true, true]
      },
      {
        name: "Processing Speed",
        values: ["Standard queue", "Priority rendering speed", "Priority queue"]
      },
      {
        name: "Storage",
        values: ["Save & download instantly", "Larger storage for projects", "Large storage"]
      },
      {
        name: "Team Collaboration",
        values: [false, false, "Multi-user access"]
      },
      {
        name: "Target Use Case",
        values: ["Creators, students, small projects", "Freelancers, content marketers", "Agencies, startups, brands"]
      },
      {
        name: "Support",
        values: ["Email support", "Priority support", "Priority support"]
      }
    ]
  },
  imageVideo: {
    title: "Image-to-Video AI Pricing",
    description: "Transform your images into stunning videos with AI-powered platform",
    plans: [
      {
        id: "free-image-video",
        name: "Free",
        price: "$0",
        period: "/month",
        isFree: true,
        isPopular: false,
        buttonText: "Start Free",
        subtitle: "Perfect for testing the platform",
        features: [
          { text: "5 clips (5s each)", included: true },
          { text: "480p resolution", included: true },
          { text: "Watermarked output", included: true },
          { text: "Basic support", included: true }
        ]
      },
      {
        id: "starter-image-video",
        name: "Starter",
        price: "$15",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Upgrade to Starter",
        subtitle: "Perfect for hobbyists & creators",
        features: [
          { 
            text: "Choose:", 
            included: true,
            options: [
              { id: 'clips', text: '240 short clips (Up to 5s each)' },
              { id: 'videos', text: '20 stitched videos (Up to 1-minute each)' }
            ]
          },
          { text: "Up to 720p resolution", included: true },
          { text: "No watermark", included: true },
          { text: "AI Storyboard (basic)", included: true },
          { text: "Real-time preview", included: true },
          { text: "Email support", included: true }
        ]
      },
      {
        id: "growth-image-video",
        name: "Growth",
        price: "$39",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Go Growth",
        subtitle: "Great for freelancers & small teams",
        features: [
          { 
            text: "Choose:", 
            included: true,
            options: [
              { id: 'clips', text: '600 short clips (Up to 5s each)' },
              { id: 'videos', text: '25 stitched videos (Up to 2-minutes each)' }
            ]
          },
          { text: "Up to 1080p resolution", included: true },
          { text: "No watermark", included: true },
          { text: "AI Storyboard (advanced)", included: true },
          { text: "Real-time preview", included: true },
          { text: "Priority support", included: true }
        ]
      },
      {
        id: "business-image-video",
        name: "Business",
        price: "$99",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Scale with Business",
        subtitle: "Designed for agencies & pros",
        features: [
          { 
            text: "Choose:", 
            included: true,
            options: [
              { id: 'clips', text: '1800 short clips (Up to 5s each)' },
              { id: 'videos', text: '50 stitched videos (Up to 3-minutes each)' }
            ]
          },
          { text: "Up to 1080p resolution", included: true },
          { text: "No watermark", included: true },
          { text: "AI Storyboard (full)", included: true },
          { text: "Real-time preview", included: true },
          { text: "Priority support + onboarding", included: true },
          { text: "AI Concierge Mode", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Video Generation",
        values: [
          "5 clips (5s)", 
          "240 short clips (Up to 5s each)\nOR\n20 stitched videos (Up to 1-minute each)", 
          "600 short clips (Up to 5s each)\nOR\n25 stitched videos (Up to 2-minutes each)", 
          "1800 short clips (Up to 5s each)\nOR\n50 stitched videos (Up to 3-minutes each)"
        ]
      },
      {
        name: "Max Resolution",
        values: ["480p", "720p", "1080p", "1080p"]
      },
      {
        name: "Watermark",
        values: ["Yes", "No", "No", "No"]
      },
      {
        name: "AI Storyboard",
        values: ["—", "Basic", "Advanced", "Full"]
      },
      {
        name: "Real-time Preview",
        values: ["—", "✓", "✓", "✓"]
      },
      {
        name: "Support",
        values: ["Basic", "Email", "Priority", "Priority + Onboarding"]
      },
      {
        name: "AI Concierge Mode",
        values: ["—", "—", "—", "✓"]
      }
    ]
  }
};

// FAQ data
export const faqData = [
  {
    id: "credits",
    question: "How many credits do I need for each service?",
    answer: "Image enhancement uses 1 credit per image, text-to-image generation uses 2-5 credits depending on resolution, and text-to-video uses 10-25 credits per video based on length and quality settings."
  },
  {
    id: "speed",
    question: "What is the processing speed for each service?",
    answer: "Image enhancement takes 15-30 seconds, text-to-image generation takes 30-60 seconds, and text-to-video generation takes 2-5 minutes depending on video length and quality settings."
  },
  {
    id: "formats",
    question: "What file formats are supported?",
    answer: "We support JPG, PNG, and WebP for images. Output videos are provided in MP4 format with H.264 encoding for maximum compatibility across all devices and platforms."
  },
  {
    id: "quality",
    question: "What quality options are available?",
    answer: "Images can be enhanced up to 8K resolution (7680x4320). Generated images support up to 4096x4096. Videos are available in 720p, 1080p, 4K, and 8K resolutions depending on your plan."
  },
  {
    id: "commercial",
    question: "Can I use generated content for commercial purposes?",
    answer: "Yes! All content generated through our platform comes with full commercial usage rights. You own the output and can use it for any purpose, including commercial projects, without attribution required."
  },
  {
    id: "refund",
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee for all subscription plans. For pay-as-you-go credits, unused credits can be refunded within 30 days of purchase if you're not satisfied with the service quality."
  }
];
