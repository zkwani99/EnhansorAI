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
          { text: "40 images / month", included: true },
          { text: "Watermarked outputs", included: true },
          { text: "Basic styles only", included: true },
          { text: "Basic support", included: true },
          { text: "Great for practice & exploring possibilities", included: true }
        ]
      },
      {
        id: "starter-ai",
        name: "Starter",
        price: "$10",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "Up to 2,000 images / month", included: true },
          { text: "512px–1K resolution", included: true },
          { text: "No watermark", included: true },
          { text: "Email support", included: true },
          { text: "Custom aspect ratios", included: true },
          { text: "Basic queue", included: true },
          { text: "Ideal for beginners & creative explorers", included: true }
        ]
      },
      {
        id: "growth-ai",
        name: "Growth",
        price: "$39",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        features: [
          { text: "Up to 10,000 images / month", included: true },
          { text: "Resolutions up to 4K", included: true },
          { text: "Batch generation (up to 20 at once)", included: true },
          { text: "Style presets & custom prompts", included: true },
          { text: "All styles & effects", included: true },
          { text: "Standard queue", included: true },
          { text: "Multi-aspect ratios", included: true },
          { text: "Priority support", included: true },
          { text: "Designed for professionals & growing teams", included: true }
        ]
      },
      {
        id: "business-ai",
        name: "Business",
        price: "$99",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "Unlimited images per month", included: true, bold: true },
          { text: "HD + Ultra-HD rendering (up to 4K)", included: true },
          { text: "Unlimited batch processing", included: true },
          { text: "Team / multi-user accounts", included: true },
          { text: "API access", included: true },
          { text: "Fastest queue priority", included: true },
          { text: "All styles & effects", included: true },
          { text: "Commercial license", included: true },
          { text: "Priority support", included: true },
          { text: "Built for studios, brands & high-volume creators", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Monthly Images",
        values: ["40 images", "2,000 images", "10,000 images", "Unlimited"]
      },
      {
        name: "Resolution",
        values: ["Basic", "512px–1K", "Up to 4K", "HD + Ultra-HD (up to 4K)"]
      },
      {
        name: "Watermark",
        values: ["Yes", "No", "No", "No"]
      },
      {
        name: "Styles & Effects",
        values: ["Basic styles only", "Custom aspect ratios", "All styles & effects", "All styles & effects"]
      },
      {
        name: "Batch Generation",
        values: ["—", "—", "Up to 20 at once", "Unlimited"]
      },
      {
        name: "Processing Queue",
        values: ["—", "Basic queue", "Standard queue", "Fastest queue priority"]
      },
      {
        name: "Team Accounts",
        values: ["—", "—", "—", "Multi-user accounts"]
      },
      {
        name: "API Access",
        values: ["—", "—", "—", "✓"]
      },
      {
        name: "Commercial License",
        values: ["—", "—", "—", "✓"]
      },
      {
        name: "Support",
        values: ["Basic", "Email", "Priority", "Priority"]
      }
    ]
  },
  video: {
    title: "Text-to-Video AI Pricing",
    description: "Generate professional videos from text descriptions",
    plans: [
      {
        id: "free-video",
        name: "Free",
        price: "$0",
        period: "/month",
        isFree: true,
        isPopular: false,
        buttonText: "Start Free",
        subtitle: "Perfect for testing the platform",
        features: [
          { text: "15 clips (5s each)", included: true },
          { text: "480p resolution", included: true },
          { text: "Watermarked output", included: true },
          { text: "Basic support", included: true },
          { text: "Perfect for testing & first-time users", included: true }
        ]
      },
      {
        id: "starter-video",
        name: "Starter",
        price: "$12",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        subtitle: "Best for trying out AI video generation",
        features: [
          { text: "200 clips (5s each)", included: true },
          { text: "720p resolution", included: true },
          { text: "Email support", included: true },
          { text: "No watermark", included: true },
          { text: "Save & download your videos instantly", included: true },
          { text: "Perfect for creator, students, and small projects", included: true }
        ]
      },
      {
        id: "growth-video",
        name: "Growth",
        price: "$29",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        subtitle: "Great for freelancers & content creators",
        features: [
          { text: "400 clips (5s each)", included: true },
          { text: "720p + 1080p resolution access", included: true },
          { text: "Priority processing", included: true },
          { text: "Standard support", included: true },
          { text: "Large storage for video projects", included: true },
          { text: "Great for freelancers, and content marketers", included: true }
        ]
      },
      {
        id: "business-video",
        name: "Business",
        price: "$79",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        subtitle: "Perfect for agencies & professional teams",
        features: [
          { text: "800 clips (10s each)", included: true },
          { text: "Full HD (1080p) resolution", included: true },
          { text: "AI Concierge Mode", included: true },
          { text: "AI Storyboard", included: true },
          { text: "Real-time Preview", included: true },
          { text: "Priority support + onboarding", included: true },
          { text: "Priority queue for faster delivery", included: true },
          { text: "Designed for agencies, startups, and brands scaling their video content", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Monthly Clips",
        values: ["15 clips (5s)", "200 clips (5s)", "400 clips (5s)", "800 clips (10s)"]
      },
      {
        name: "Max Resolution",
        values: ["480p", "720p", "720p + 1080p", "Full HD (1080p)"]
      },
      {
        name: "Watermark",
        values: ["Yes", "No", "No", "No"]
      },
      {
        name: "Processing Queue",
        values: ["Standard", "Standard", "Priority", "Priority"]
      },
      {
        name: "AI Storyboard",
        values: ["—", "—", "—", "✓"]
      },
      {
        name: "Real-time Preview",
        values: ["—", "—", "—", "✓"]
      },
      {
        name: "AI Concierge Mode",
        values: ["—", "—", "—", "✓"]
      },
      {
        name: "Support",
        values: ["Basic", "Email", "Standard", "Priority + Onboarding"]
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
