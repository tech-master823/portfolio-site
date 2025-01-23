import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, HashRouter as Router } from 'react-router-dom'; 
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from './utils/Themes.js';
import styled from "styled-components";
import { ref, onValue } from "firebase/database";
import { database } from "./FirebaseConfig";

// Pages
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects.jsx";
import TermsandConditions from "./pages/TermsandConditions.jsx";
import './App.css'; // Move this to the bottom or leave it here if it doesn't affect styles

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [firebaseData, setFirebaseData] = useState({
    Bio: null,
    skills: null,
    projects: null,
    education: null
  });

  useEffect(() => {
    setFirebaseData({
      Bio: {
        name: "Gustavo Oliveira P",
        roles: "Python & AI Specialist",
        resume: "https://flowcv.com/resume/ql3le7bs5b",
        description: "Senior Python Developer with expertise in robust web applications and AI solutions. " + 
        "Proficient in Django, Flask, and modern frontend frameworks like React and Vue.js. " + 
        "Experienced in delivering scalable, secure full-stack apps and deploying on AWS, Azure, and GCP. " + 
        "Contributed to the LangChain framework and created various GPT-based applications.",
      },
      skills: [
        {
          title: "Generative AI",
          skills: [
            { name: "OpenAI", image: "/icons/chatgpt-svg.svg" }, 
            { name: "Langchain", image: "/icons/chain-image.png" },
            { name: "LlaMA", image: "/icons/llama-image.png" },
            { name: "RAG System", image: "/icons/setting-svg.svg" },
            { name: "NLP", image: "/icons/nlp-svg.svg" },
            { name: "Stable Diffusion", image: "/icons/stable-image.png" },
          ]
        },
        {
          title: "AI/ML",
          skills: [
            { name: "Python", image: "/icons/python-svg.svg" }, 
            { name: "Tensorflow", image: "/icons/tensorflow-svg.svg" },
            { name: "Numpy", image: "/icons/numpy-svg.svg" },
            { name: "Pandas", image: "/icons/pandas-svg.svg" },
            { name: "PyTorch", image: "/icons/pytorch-svg.svg" },
          ]
        },
        {
          title: "Frontend",
          skills: [
            { name: "React", image: "/icons/react-svg.svg" }, 
            { name: "Next.js", image: "/icons/nextjs-svg.svg" }, 
            { name: "Vue.js", image: "/icons/vue-svg.svg" },
            { name: "Nuxt.js", image: "/icons/nuxtjs-svg.svg" },
            { name: "Angular", image: "/icons/angular-svg.svg" },
            { name: "Tailwind CSS", image: "/icons/tailwindcss-svg.svg" },
          ]
        },
        {
          title: "Backend",
          skills: [
            { name: "Python", image: "/icons/python-svg.svg" }, 
            { name: "Django", image: "/icons/django-svg.svg" },
            { name: "Flask", image: "https://repository-images.githubusercontent.com/596892/cc2c69ec-9251-4b33-8283-b86a8659c9cb" },
            { name: "FastAPI", image: "/icons/fastapi-image.png" },
            { name: "NodeJS", image: "/icons/node-svg.svg" },
            { name: "Express", image: "/icons/express-svg.svg" },
          ]
        },
        {
          title: "Database & Clouding",
          skills: [
            { name: "MySQL", image: "/icons/mysql-svg.svg" },
            { name: "PostgreSQL", image: "/icons/postgresql-svg.svg" },
            { name: "Firebase", image: "/icons/firebase-svg.svg" },
            { name: "GCP", image: "/icons/google-cloud-svg.svg" },
            { name: "AWS", image: "/icons/aws-svg.svg" },
            { name: "Azure", image: "/icons/azure-svg.svg" },
          ]
        },
        {
          title: "DevOps & Tools",
          skills: [
            { name: "Docker", image: "/icons/docker-svg.svg" },
            { name: "Git", image: "/icons/git-svg.svg" },
            { name: "Kubernetes", image: "/icons/kubernetes-svg.svg" },
            { name: "Jira", image: "/icons/jira-image.png" },
          ]
        },
      ], 
      experiences: [
        {
          id: "1",
          company: "Positivo Tecnologia",
          role: "Senior Python Developer – Full-Stack, AI & Cloud Solutions",
          img: "/icons/positive-company-logo.png",
          desc: "Actively engaged in developing innovative AI services, " + 
          "including a healthcare chatbot and LLM-powered microservices, " + 
          "with a focus on enhancing data management and user satisfaction through cloud platforms.",
          date: "Mar 2021 - Present",
          skills: ["OpenAI", "GPT", "Langchain", "LlaMA 3", "AWS", "Azure", "Docker"]
        },
        {
          id: "2",
          company: "Linx",
          role: "Full Stack & AI Developer",
          img: "/icons/linx-company-logo.webp",
          desc: "Contributed to Architect and develop multiple web applications, " + 
          "including an ERP system and a scalable e-commerce platform utilzing innovative AI strategies, " + 
          "while establishing CI/CD pipelines with Docker and Kubernetes, resulting in reduced project deployment time, and enhanced productivity and quality of code.",
          date: "Jan 2018 – Dec 2020",
          skills: ["Django", "Flask", "FastAPI", "React", "Vue.js", "OpenAI", "Docker", "Kubernetes"]
        }, 
        {
          id: "3",
          company: "BRQ Digital Solutions",
          role: "Python Developer",
          img: "/icons/rb-company-logo.jfif",
          desc: "Enhanced data accuracy, processing speed, and revenue growth by spearheading innovative data solutions, " + 
          "including a sophisticated Python web scraper, efficient data pipelines, and a predictive model for client churn that transformed business strategies.",
          date: "Jan 2015 – Nov 2017",
          skills: ["Django", "Tensorflow", "Pandas", "Numpy", "Docker"]
        }
        // {
        //   id: "1",
        //   company: "Impressit",
        //   role: "Senior Python Developer – Full-Stack, AI & Cloud Solutions",
        //   img: "/icons/impressit-company-logo.jpg",
        //   desc: "Actively engaged in developing innovative AI services, " + 
        //   "including a healthcare chatbot and LLM-powered microservices, " + 
        //   "with a focus on enhancing data management and user satisfaction through cloud platforms.",
        //   date: "Mar 2020 - Present",
        //   skills: ["OpenAI", "GPT", "Langchain", "LlaMA 3", "AWS", "Azure", "Docker", "Next,js", "Nuxt.js"]
        // },
        // {
        //   id: "2",
        //   company: "Synodus",
        //   role: "Full Stack & AI Developer",
        //   img: "/icons/synodus-company-logo.jpg",
        //   desc: "Contributed to Architect and develop multiple web applications, " + 
        //   "including an ERP system and a scalable e-commerce platform utilzing innovative AI strategies, " + 
        //   "while establishing CI/CD pipelines with Docker and Kubernetes, resulting in reduced project deployment time, and enhanced productivity and quality of code.",
        //   date: "Jan 2016 – Dec 2019",
        //   skills: ["Django", "Flask", "FastAPI", "React", "Vue.js", "OpenAI", "Docker", "Kubernetes"]
        // }, 
        // {
        //   id: "3",
        //   company: "CodLUCK Technology ., JSC",
        //   role: "Python Developer",
        //   img: "/icons/codluck-company-logo.jpg",
        //   desc: "Enhanced data accuracy, processing speed, and revenue growth by spearheading innovative data solutions, " + 
        //   "including a sophisticated Python web scraper, efficient data pipelines, and a predictive model for client churn that transformed business strategies.",
        //   date: "Jan 2013 – Nov 2015",
        //   skills: ["Django", "Tensorflow", "Pandas", "Numpy", "Docker"]
        // }
      ],
      projects: [
        {
          id: "1",
          ontop: 1,
          image: "/image/erp.png",
          title: "ERPNext - ERP System",
          description: "Leveraged AI/ML in our ERP system to automate data entry, optimize supply chain management, and forecast inventory needs through predictive analytics. " + 
          "By harnessing machine learning, we can now predict demand fluctuations and adjust inventory levels proactively.",
          tags: ["Django", "ERP Platform", "ERPNext", "Machine Learning", "OpenAI"],
          date: "Mar 2016 - Jun 2017"
        }, 
        {
          id: "6",
          ontop: 1,
          image: "/image/fahertybrand.jpeg",
          title: "AI Assistant for Fahertybrand",
          description: "Crafted an innovative AI-powered assistant chatbot for Fahertybrand, an American clothing sales e-commerce platform, " + 
          "that revolutionized the user search experience. Enhanced the platform's ability to seamlessly connect shoppers with their desired products, " + 
          "resulting in a significant boost in user engagement and overall satisfaction. ",
          tags: ["React.js", "Firebase", "OpenAI", "GPT", "Pinecone", "Langchain", "LlaMA"],
          date: "Feb 2018 - Nov 2018",
          webapp: "https://www.fahertybrand.com"
        }, 
        {
          id: "2",
          ontop: 1,
          image: "/image/chatbotsoc.png",
          title: "ChatSoc",
          description: "Developed 'ChatSoC,' an advanced chatbot using OpenAI's API in Python, " + 
          "featuring capabilities such as text-to-voice output, voice-to-text input, " + 
          "QR login mechanism using OpenCV, AI image generation with DALL-E, YouTube video downloading, and Wikipedia content referencing.",
          tags: ["Python", "NLP", "OpenAI GPT", "Langchain", "RAG", "Pinecone"],
          date: "Jul 2023 - Sept 2023",
          github: "https://github.com/smart-coder997/ChatSoc",
        }, 
        {
          id: "3",
          ontop: 1,
          image: "/image/image-generator.png",
          title: "AI Image Generator - GAN",
          description: "Developed and launched a cutting-edge AI image generation platform utilizing the Stable Diffusion model and GANs, " + 
          "allowing users to effortlessly create complex images with simple text prompts and unlocking unparalleled creative possibilities " + 
          "for digital art, advertising, and marketing.",
          tags: ["Python", "OpenAI", "Stable Diffusion", "GAN", "Machine Learning", "Next.js"],
          date: "Mar 2023 - Feb 2024",
          webapp: "https://www.piclumen.com/"
        }, 
        {
          id: "4",
          ontop: 1,
          image: "/image/virtual-voice-assistant.png",
          title: "Virtual Voice Assistant",
          description: "Virtual Voice Assistant is a project that utilizes machine learning and " + 
          "natural language processing to enable users to control their devices using voice commands. " + 
          "Technologies used include TensorFlow, Keras, various Python libraries and RESTful APIs.",
          tags: ["Python", "OpenAI", "NLP", "AI Agent", "Speech-to-Text", "Nuxt.js"],
          date: "Apr 2021 - Aug 2021",
          github: "https://github.com/smart-coder997/virtual-voice-assistant",
        }
      ],
      education: [
        {
          id: "1",
          school: "FGV/EBAPE",
          degree: "Master of Technology - MTech, Artificial Intelligent",
          img: "/icons/fgv-university.jfif",
          date: "Aug 2020 – Nov 2021",
          grade: "87.83%",
          desc: "In this course, I focused on developing an AI web service platform using " + 
          "technologies like OpenAI, GPT, LLM, and Machine Learning, enhancing user experience and automating tasks through projects and collaboration with peers, " + 
          "focusing on natural language processing and computer vision for customized services."
        },
        {
          id: "2",
          school: "Universidade Federal do Pampa",
          degree: "Bachelor of Computer Science (UNIPAMPA)",
          img: "/icons/university.jfif",
          date: "Mar 2010 – Dec 2014",
          grade: "97.76%",
          desc: "I gained in-depth knowledge of programming languages like C++, Python, and JavaScript, " + 
          "dedicating significant effort to mastering Python and its scientific libraries, " + 
          "while also exploring backend technologies like Django and Flask to enhance my web development skills."
        },
      ]
    })
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Suspense>
          <Body>
            <Routes>
              <Route path="/" element={
                <Home firebaseData={firebaseData} openModal={openModal} setOpenModal={setOpenModal} />
              } />
              <Route path="/AllProjects" element={
                <AllProjects firebaseData={firebaseData} openModal={openModal} setOpenModal={setOpenModal} />
              } />
              <Route path="/TermsandConditions" element={<TermsandConditions firebaseData={firebaseData}/>} />
              <Route path="*" element={<Home firebaseData={firebaseData} openModal={openModal} setOpenModal={setOpenModal} />} />
            </Routes>
          </Body>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
