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
        buttonText: "Get Started",
        features: [
          { text: "5 images/month", included: true },
          { text: "2x upscaling max", included: true },
          { text: "Basic quality", included: false }
        ]
      },
      {
        id: "starter-image",
        name: "Starter",
        price: "$9",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "100 images/month", included: true },
          { text: "4x upscaling", included: true },
          { text: "HD quality", included: true }
        ]
      },
      {
        id: "growth-image",
        name: "Growth",
        price: "$29",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        features: [
          { text: "500 images/month", included: true },
          { text: "8x upscaling", included: true },
          { text: "8K quality", included: true }
        ]
      },
      {
        id: "business-image",
        name: "Business",
        price: "$99",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "2,000 images/month", included: true },
          { text: "8x upscaling", included: true },
          { text: "Priority processing", included: true }
        ]
      },
      {
        id: "payg-image",
        name: "Pay-as-you-go",
        price: "$0.10",
        period: "/image",
        isFree: false,
        isPopular: false,
        buttonText: "Buy Credits",
        features: [
          { text: "No monthly limit", included: true },
          { text: "8x upscaling", included: true },
          { text: "8K quality", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Processing Speed",
        values: ["Standard", "Fast", "Priority", "Instant", "Priority"]
      },
      {
        name: "Batch Processing",
        values: [false, true, true, true, true]
      },
      {
        name: "API Access",
        values: [false, false, true, true, true]
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
        buttonText: "Get Started",
        features: [
          { text: "3 images/month", included: true },
          { text: "512x512 resolution", included: true },
          { text: "Basic styles only", included: false }
        ]
      },
      {
        id: "starter-ai",
        name: "Starter",
        price: "$15",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "50 images/month", included: true },
          { text: "1024x1024 resolution", included: true },
          { text: "All art styles", included: true }
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
          { text: "200 images/month", included: true },
          { text: "2048x2048 resolution", included: true },
          { text: "Premium styles", included: true }
        ]
      },
      {
        id: "business-ai",
        name: "Business",
        price: "$129",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "1,000 images/month", included: true },
          { text: "4096x4096 resolution", included: true },
          { text: "Custom training", included: true }
        ]
      },
      {
        id: "payg-ai",
        name: "Pay-as-you-go",
        price: "$0.25",
        period: "/image",
        isFree: false,
        isPopular: false,
        buttonText: "Buy Credits",
        features: [
          { text: "No monthly limit", included: true },
          { text: "4096x4096 resolution", included: true },
          { text: "All styles", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Processing Speed",
        values: ["Standard", "Fast", "Priority", "Instant", "Priority"]
      },
      {
        name: "Style Variations",
        values: ["Basic", "Standard", "Premium", "All + Custom", "All + Custom"]
      },
      {
        name: "Commercial Rights",
        values: [true, true, true, true, true]
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
        buttonText: "Get Started",
        features: [
          { text: "1 video/month", included: true },
          { text: "5 seconds max", included: true },
          { text: "720p quality", included: false }
        ]
      },
      {
        id: "starter-video",
        name: "Starter",
        price: "$25",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "10 videos/month", included: true },
          { text: "30 seconds max", included: true },
          { text: "1080p quality", included: true }
        ]
      },
      {
        id: "growth-video",
        name: "Growth",
        price: "$69",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        features: [
          { text: "50 videos/month", included: true },
          { text: "60 seconds max", included: true },
          { text: "4K quality", included: true }
        ]
      },
      {
        id: "business-video",
        name: "Business",
        price: "$199",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "200 videos/month", included: true },
          { text: "120 seconds max", included: true },
          { text: "8K quality", included: true }
        ]
      },
      {
        id: "payg-video",
        name: "Pay-as-you-go",
        price: "$2.50",
        period: "/video",
        isFree: false,
        isPopular: false,
        buttonText: "Buy Credits",
        features: [
          { text: "No monthly limit", included: true },
          { text: "120 seconds max", included: true },
          { text: "8K quality", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Processing Speed",
        values: ["Standard", "Fast", "Priority", "Instant", "Priority"]
      },
      {
        name: "Aspect Ratios",
        values: ["16:9", "Multiple", "All", "All + Custom", "All + Custom"]
      },
      {
        name: "Export Formats",
        values: ["MP4", "MP4 + WebM", "All Formats", "All + Raw", "All + Raw"]
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
