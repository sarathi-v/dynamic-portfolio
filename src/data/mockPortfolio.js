import { getRandomImage } from "./randomImages";
const mockPortfolio = {
  name: "MOHAMMED ASKAR",
  role: "Full Stack Developer",
  email: "yourname@email.com",

  profileImage:
    "/image/profile.png",

  about:
    "I am a passionate developer who loves building web applications.",

  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB"
  ],

 profileImage: getRandomImage(),

projects: [
  {
    title: "Portfolio Builder",
    description: "An AI-powered portfolio creation platform.",
    image: getRandomImage(),
  },
  {
    title: "E-Commerce Website",
    description: "An online shopping website.",
    image: getRandomImage(),
  },
  {
    title: "Brand Identity",
    description: "A modern visual identity and branding project.",
    image: getRandomImage(),
  },
],

caseStudy: {
  title: "Rebranding",
  description:
    "A rebranding project focused on clarity, heritage, and timeless appeal.",
  image: getRandomImage(),
},

designPhilosophy: {
  text1: "Design communicates before words do",
  text2: "Simplicity strengthens emotional impact",
  image: getRandomImage(),
},

coreValues: {
  image1: getRandomImage(),
  image2: getRandomImage(),
},

personalAesthetic: {
  image: getRandomImage(),
},

    socialLinks: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/"
  }

};

export default mockPortfolio;