export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface CVData {
  name: string;
  title: string;
  bio: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  instagram: string;
  skills: {
    category: string;
    items: string[];
  }[];
  tools: string[];
  experience: Experience[];
  projects: Project[];
  services: {
    id: string;
    title: string;
    description: string;
  }[];
}

export const cvData: CVData = {
  name: "Muhammad Ahmad",
  title: "Video Editor & Graphic Designer",
  bio: "Video Editor & Graphic Designer with 2.5+ years of experience producing digital content that boosts social engagement and brand visibility. Delivered 100+ reels and visuals for brands across events, NGOs, and consumer products, consistently increasing reach and post engagement by up to 40%. Skilled in Adobe Suite and AI-assisted designs. Passionate about visual storytelling that drives real results.",
  location: "Lahore, Pakistan",
  phone: "+92 323 4776304",
  email: "30mad04@gmail.com",
  website: "https://www.behance.net/muhammadahmad698",
  linkedin: "https://www.linkedin.com/in/muhammad-ahmad-a6a659202",
  instagram: "https://www.behance.net/muhammadahmad698",
  skills: [
    {
      category: "Video Editing & Production",
      items: [
        "Adobe Premiere Pro",
        "After Effects",
        "CapCut",
        "Motion Graphics",
        "Color Correction",
        "Sound Design",
      ],
    },
    {
      category: "Graphic Design",
      items: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Canva",
        "Brand Identity",
        "Typography",
        "Layout Design",
      ],
    },
    {
      category: "Marketing & Strategy",
      items: [
        "Social Media Marketing",
        "Digital Campaign Design",
        "Visual Storytelling",
        "Content Strategy",
      ],
    },
    {
      category: "AI Tools",
      items: ["Google VEO 3", "Sora", "ChatGPT", "AI Image Generation"],
    },
  ],
  tools: [
    "Adobe Premiere Pro",
    "After Effects",
    "Photoshop",
    "Illustrator",
    "CapCut",
    "Canva",
    "Google VEO 3",
    "Sora",
  ],
  experience: [
    {
      id: "1",
      role: "Video Editor & Graphic Designer",
      company: "Intezam",
      period: "July 2024 - Present",
      description:
        "Leading creative and production workflows for diverse clients across NGOs, consumer products, and corporate sectors.",
      achievements: [
        "Designed and edited 100+ video projects including event highlight reels, promotional videos, and branded social media content for Instagram, Facebook, and LinkedIn",
        "Created and executed visual branding strategies for diverse clients including Green Crescent Trust (NGO), Big Paw (pet food brand), and AMC (chemical export company)",
        "Handled post-event video and design deliverables for Pakistan Chemical Expo – 3rd Edition",
        "Managed end-to-end post-production workflows including editing, color grading, audio mixing, and motion graphics",
        "Led on-set creative coordination, overseeing lighting, framing, and sound capture",
      ],
    },
    {
      id: "2",
      role: "Video Editor & Graphic Designer",
      company: "Level Up Solutions",
      period: "April 2023 - May 2024",
      description: "Produced digital assets and collaborated with marketing teams for brand growth.",
      achievements: [
        "Produced digital assets including short-form videos, social media graphics, banners, and promotional materials",
        "Collaborated with marketing teams to design ad creatives and motion graphics that improved click-through rates",
        "Assisted in storyboarding, shot planning, and visual composition",
        "Improved project delivery efficiency by streamlining feedback loops",
        "Supported campaign launches with content optimized for Reels & YouTube Shorts",
      ],
    },
  ],
  projects: [
    {
      id: "1",
      title: "Big Paw Pakistan",
      description:
        "Complete visual branding and social media content strategy for a premium pet food brand",
      category: "Brand Strategy",
      year: "2024",
      image: "https://images.unsplash.com/photo-1552053831-71594a27c62d?w=500&h=300&fit=crop",
    },
    {
      id: "2",
      title: "Green Crescent Trust",
      description: "NGO branding and awareness campaign with video storytelling",
      category: "NGO Campaign",
      year: "2024",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    },
    {
      id: "3",
      title: "Pakistan Chemical Expo",
      description:
        "Post-event video production and promotional materials for major trade expo",
      category: "Event Coverage",
      year: "2024",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
    },
    {
      id: "4",
      title: "Almajeed Corporation",
      description: "Corporate social media content and brand video production",
      category: "Corporate",
      year: "2023",
      image: "https://images.unsplash.com/photo-1553531889-e6cf89d19dab?w=500&h=300&fit=crop",
    },
  ],
  services: [
    {
      id: "1",
      title: "Video Editing & Production",
      description: "Professional video editing, color grading, and motion graphics for all platforms",
    },
    {
      id: "2",
      title: "Graphic Design",
      description: "Brand identity, social media graphics, and visual content creation",
    },
    {
      id: "3",
      title: "Content Strategy",
      description: "Social media content planning and execution for maximum engagement",
    },
    {
      id: "4",
      title: "Brand Development",
      description: "Complete brand strategy, visual identity, and marketing collateral",
    },
    {
      id: "5",
      title: "Motion Graphics",
      description: "Animated explainer videos, title sequences, and visual effects",
    },
    {
      id: "6",
      title: "AI-Assisted Design",
      description: "Leveraging cutting-edge AI tools for rapid concept generation and creation",
    },
  ],
};
