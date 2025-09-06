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
          { text: "50 images per month", included: true },
          { text: "Up to 1K resolution", included: true },
          { text: "Basic AI upscaling (1×)", included: true },
          { text: "Watermarked results", included: true },
          { text: "Basic support", included: true },
          { text: "Great for testing AI upscaling with no commitment", included: true }
        ]
      },
      {
        id: "starter-image",
        name: "Starter",
        price: "$12",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "1,000 images per month", included: true },
          { text: "Up to 2K resolution", included: true },
          { text: "Multiple upscale modes (2×)", included: true },
          { text: "Batch processing (up to 5 at once)", included: true },
          { text: "Basic denoise", included: true },
          { text: "Email support", included: true },
          { text: "Ideal for everyday creators and personal use", included: true }
        ]
      },
      {
        id: "growth-image",
        name: "Growth",
        price: "$39",
        period: "/month",
        isFree: false,
        isPopular: true,
        buttonText: "Choose Plan",
        features: [
          { text: "5,000 images per month", included: true },
          { text: "Up to 4K resolution", included: true },
          { text: "Advanced upscaling (2×, 4×)", included: true },
          { text: "Batch processing (up to 20 at once)", included: true },
          { text: "Smart denoise + sharpen", included: true },
          { text: "Priority support", included: true },
          { text: "Early access to new models", included: true },
          { text: "Designed for freelancers, marketers & pros", included: true }
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
          { text: "15000 images per month", included: true, bold: true },
          { text: "Up to 6K resolution", included: true },
          { text: "Full upscale range (2×, 4×, 6× Ultra HD)", included: true },
          { text: "Unlimited batch processing", included: true },
          { text: "API access", included: true },
          { text: "Face restore + advanced enhancement", included: true },
          { text: "Real-time preview before final render", included: true },
          { text: "Priority support + onboarding", included: true },
          { text: "Commercial use license", included: true },
          { text: "Built for agencies and high-volume teams", included: true }
        ]
      }
    ],
    comparisonFeatures: [
      {
        name: "Monthly Images",
        values: ["50 images", "1,000 images", "5,000 images", "15,000 images"]
      },
      {
        name: "Resolution",
        values: ["Up to 1K", "Up to 2K", "Up to 4K", "Up to 6K"]
      },
      {
        name: "Upscaling Modes",
        values: ["Basic AI (1×)", "Multiple modes (2×)", "Advanced (2×, 4×)", "Full range (2×, 4×, 6×)"]
      },
      {
        name: "Watermark",
        values: ["Watermarked results", "No watermark", "No watermark", "No watermark"]
      },
      {
        name: "Batch Processing",
        values: ["—", "Up to 5 at once", "Up to 20 at once", "Unlimited"]
      },
      {
        name: "Enhancement Features",
        values: ["—", "Basic denoise", "Smart denoise + sharpen", "Face restore + advanced"]
      },
      {
        name: "API Access",
        values: [false, false, false, true]
      },
      {
        name: "Support",
        values: ["Basic support", "Email support", "Priority support", "Priority + onboarding"]
      },
      {
        name: "Commercial License",
        values: [false, false, false, true]
      },
      {
        name: "Special Features",
        values: ["—", "—", "Early access to models", "Real-time preview"]
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
          { text: "50 images per month", included: true },
          { text: "Up to 512px resolution", included: true },
          { text: "Watermarked outputs", included: true },
          { text: "Basic styles only", included: true },
          { text: "Basic support", included: true },
          { text: "Great for practice & exploring possibilities", included: true }
        ]
      },
      {
        id: "starter-ai",
        name: "Starter",
        price: "$12",
        period: "/month",
        isFree: false,
        isPopular: false,
        buttonText: "Choose Plan",
        features: [
          { text: "1500 images per month", included: true },
          { text: "Up to 1K resolution", included: true },
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
          { text: "6000 images per month", included: true },
          { text: "Up to 2K resolution", included: true },
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
          { text: "15000 images per month", included: true, bold: true },
          { text: "Up to 4K resolution", included: true },
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
        values: ["50 images per month", "1,500 images per month", "6,000 images per month", "15,000 images per month"]
      },
      {
        name: "Resolution",
        values: ["Up to 512px", "Up to 1K", "Up to 2K", "Up to 4K"]
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
          { text: "20 clips per month (up to 5s each)", included: true },
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
          { text: "200 clips per month (up to 5s each)", included: true },
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
          { text: "500 clips per month (up to 8s each)", included: true },
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
          { text: "1500 clips per month (up to 10s each)", included: true },
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
        values: ["20 clips per month (up to 5s)", "200 clips per month (up to 5s)", "500 clips per month (up to 8s)", "1500 clips per month (up to 10s)"]
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
          { text: "10 animations per month (5s each)", included: true },
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
              { id: 'clips', text: '240 animations per month (up to 5s each)' },
              { id: 'videos', text: '20 stitched videos per month (up to 1 minute each)' }
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
              { id: 'clips', text: '600 animations per month (up to 8s each)' },
              { id: 'videos', text: '40 stitched videos per month (up to 2 minutes each)' }
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
              { id: 'clips', text: '1440 animations per month (up to 10s each)' },
              { id: 'videos', text: '80 stitched videos per month (up to 3 minutes each)' }
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
          "10 animations per month (5s)", 
          "240 animations per month (up to 5s each)\nOR\n20 stitched videos per month (up to 1 minute each)", 
          "600 animations per month (up to 8s each)\nOR\n40 stitched videos per month (up to 2 minutes each)", 
          "1440 animations per month (up to 10s each)\nOR\n80 stitched videos per month (up to 3 minutes each)"
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
    answer: "Credits vary by output type. For example, higher resolutions and longer video durations require more credits. A full breakdown is shown on each service page."
  },
  {
    id: "speed",
    question: "What is the processing speed for each service?",
    answer: "Most image enhancements complete in seconds, while video generations may take 1–3 minutes depending on length and resolution."
  },
  {
    id: "formats",
    question: "What file formats are supported?",
    answer: "We support JPG, PNG, and WebP for image uploads. Video exports are available in MP4 format."
  },
  {
    id: "quality",
    question: "What quality options are available?",
    answer: "You can choose from multiple resolutions (1K–4K for images, 720p–1080p for videos) and upscaling levels (1×–6×). Options depend on your subscription plan or PAYG credits."
  },
  {
    id: "commercial",
    question: "Can I use generated content for commercial purposes?",
    answer: "Commercial usage rights are included only in our higher-tier subscription plans. Free and Starter plans are for personal or non-commercial use."
  },
  {
    id: "payg",
    question: "Do you offer both subscriptions and PAYG?",
    answer: "Yes. You can subscribe to a monthly plan with fixed outputs or use flexible PAYG credits across all services."
  }
];
