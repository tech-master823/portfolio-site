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
        name: "Kauai Santana",
        roles: "Senior Full Stack Developer",
        resume: "https://app.enhancv.com/share/56d521b5/?utm_medium=growth&utm_campaign=share-resume&utm_source=dynamic",
        linkedin: "https://www.linkedin.com/in/gustavo-pacheco28/",
        github: "https://github.com/tech-master823/", 
        description: "Senior Full Stack Developer with expertise in robust web applications and AI solutions. " + 
        "Worked on E-Commerce, Saas, Healthcare, etc with Proficiency in Django, FastAPI, Node.js, Spring Boot, ASP.NET, Laravel," + 
        " and modern frontend frameworks like React, Angular and Vue.js. " + 
        "Experienced in delivering scalable, secure full-stack apps and deploying on AWS, Azure, and GCP. " + 
        "Contributed to the LangChain framework and created various GPT-based applications.",
      },
      skills: [
        {
          title: "Generative AI",
          skills: [
            { name: "OpenAI", image: "/icons/chatgpt-svg.svg" }, 
            { name: "NLP", image: "/icons/nlp-svg.svg" },
            { name: "Langchain", image: "/icons/chain-image.png" },
            { name: "LlamaIndex", image: "/icons/llama-image.png" },
            { name: "RAG System", image: "/icons/setting-svg.svg" },
            { name: "Stable Diffusion", image: "/icons/stable-image.png" },
            { name: "Pinecone", image: "/icons/pinecone.svg" },
          ]
        },
        {
          title: "Programming Languages",
          skills: [
            { name: "Python", image: "/icons/python-svg.svg" }, 
            { name: "C#", image: "/icons/csharp.svg" },
            { name: ".NET", image: "/icons/dotnet.svg" },
            { name: "Javascript", image: "/icons/javascript.svg" },
            { name: "Typescript", image: "/icons/typescript.svg" },
            { name: "PHP", image: "/icons/php.svg" },
            { name: "Java", image: "/icons/java.svg" },
            { name: "R", image: "/icons/r.svg" },
            { name: "SQL", image: "/icons/sql.svg" },
          ]
        },
        {
          title: "Frontend",
          skills: [
            { name: "HTML5", image: "/icons/html-5-svg.svg" }, 
            { name: "CSS3", image: "/icons/css.svg" }, 
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
            { name: "Django", image: "/icons/django-svg.svg" },
            { name: "Flask", image: "https://repository-images.githubusercontent.com/596892/cc2c69ec-9251-4b33-8283-b86a8659c9cb" },
            { name: "FastAPI", image: "/icons/fastapi-image.png" },
            { name: "ASP.NET", image: "/icons/asp.net.png" },
            { name: "Spring", image: "/icons/spring.png" },
            { name: "Node.js", image: "/icons/node-svg.svg" },
            { name: "Express", image: "/icons/express-svg.svg" },
            { name: "Nest.js", image: "/icons/nest.svg" },
            { name: "Laravel", image: "/icons/laravel.svg" },
          ]
        },
        {
          title: "Database & Clouding",
          skills: [
            { name: "MySQL", image: "/icons/mysql-svg.svg" },
            { name: "PostgreSQL", image: "/icons/postgresql-svg.svg" },
            { name: "Firebase", image: "/icons/firebase-svg.svg" },
            { name: "MS SQL Server", image: "/icons/sql-server.svg" },
            { name: "Redis", image: "/icons/redis.svg" },
            { name: "AWS", image: "/icons/aws-svg.svg" },
            { name: "Azure", image: "/icons/azure-svg.svg" },
            { name: "GCP", image: "/icons/google-cloud-svg.svg" },
          ]
        },
        {
          title: "DevOps & Tools",
          skills: [
            { name: "Visual Studio", image: "/icons/visual-studio.svg" }, 
            { name: "Docker", image: "/icons/docker-svg.svg" },
            { name: "Git", image: "/icons/git-svg.svg" },
            { name: "Kubernetes", image: "/icons/kubernetes-svg.svg" },
            { name: "Jira", image: "/icons/jira-image.png" },
          ]
        },
      ], 
      experiences: [
        // {
        //   id: "1",
        //   company: "IConflux Technologies Pvt. Ltd.",
        //   role: "Senior Python Developer – Full-Stack, AI & Cloud Solutions",
        //   img: "/icons/iconflux-company-logo.png",
        //   desc: "Actively engaged in developing innovative AI services, " + 
        //   "including a healthcare chatbot and LLM-powered microservices, " + 
        //   "with a focus on enhancing data management and user satisfaction through cloud platforms.",
        //   date: "Mar 2021 - Present",
        //   skills: ["OpenAI", "GPT", "Langchain", "LLaMA 3", "AWS", "Azure", "Docker"]
        // },
        // {
        //   id: "2",
        //   company: "Linx",
        //   role: "Full Stack & AI Developer",
        //   img: "/icons/linx-company-logo.webp",
        //   desc: "Contributed to Architect and develop multiple web applications, " + 
        //   "including an ERP system and a scalable e-commerce platform utilzing innovative AI strategies, " + 
        //   "while establishing CI/CD pipelines with Docker and Kubernetes, resulting in reduced project deployment time, and enhanced productivity and quality of code.",
        //   date: "Jan 2018 – Dec 2020",
        //   skills: ["Django", "Flask", "FastAPI", "React", "Vue.js", "OpenAI", "Docker", "Kubernetes"]
        // }, 
        // {
        //   id: "3",
        //   company: "BRQ Digital Solutions",
        //   role: "Python Developer",
        //   img: "/icons/rb-company-logo.jfif",
        //   desc: "Enhanced data accuracy, processing speed, and revenue growth by spearheading innovative data solutions, " + 
        //   "including a sophisticated Python web scraper, efficient data pipelines, and a predictive model for client churn that transformed business strategies.",
        //   date: "Jan 2015 – Nov 2017",
        //   skills: ["Django", "Tensorflow", "Pandas", "Numpy", "Docker"]
        // }
        {
          id: "1",
          company: "TALRACE",
          role: "Senior Full Stack Developer – AI & Cloud Solutions",
          img: "/icons/talrace-logo.jpg",
          desc: "Actively engaged in developing innovative AI services, " + 
          "including a healthcare chatbot and LLM-powered microservices, " + 
          "with a focus on enhancing data management and user satisfaction through cloud platforms.",
          date: "Feb 2020 - Present",
          skills: ["Django", "FastAPI", "ASP.NET", "Spring Boot", "Nest.js", "R", "OpenAI", "GPT", "Langchain", "LLaMA 3", "AWS", "Azure", "GCP", "Docker"]
        },
        {
          id: "2",
          company: "Synodus",
          role: "Full Stack Developer",
          img: "/icons/synodus-company-logo.jpg",
          desc: "Contributed to Architect and develop multiple web applications, " + 
          "including an ERP system and a scalable e-commerce platform utilzing innovative AI strategies, " + 
          "while establishing CI/CD pipelines with Docker and Kubernetes, resulting in reduced project deployment time, and enhanced productivity and quality of code.",
          date: "Jan 2016 – Sept 2021",
          skills: ["Django", "Spring Boot", "ASP.NET", "Laravel", "React", "Vue.js", "Angular", "Next.js", "AWS", "Azure", "OpenAI", "Docker", "Kubernetes"]
        }, 
        {
          id: "3",
          company: "CodLUCK Technology ., JSC",
          role: "Software Developer",
          img: "/icons/codluck-company-logo.jpg",
          desc: "Enhanced data accuracy, processing speed, and revenue growth by spearheading innovative data solutions, " + 
          "including a sophisticated web scraper, efficient data pipelines, and a predictive model for client churn that transformed business strategies.",
          date: "Jan 2013 – Nov 2015",
          skills: ["Django", "Flask", "Node.js", "Laravel", "Java", "React", "Vue.js", "Angular", "Tensorflow", "Pandas", "Numpy", "Docker"]
        }
      ],
      projects: [
        {
          id: "1",
          ontop: 1,
          image: "/image/gavani.webp",
          title: "Gavani - eCommerce for Clothes sales",
          description: "Gavani is a platform for selling clothes online. " + 
          "This is for Sellers and buyers. The platform does provide other automation settings and tools to help user find potential buyer or seller.",
          responsibilities: [
            "Create a responsive UI with Vue.js, develop custom APIs in Laravel and integrate third-party services like inventory management and payment gateways.",
            "Implement secure payments, comply with data privacy laws, and establish user authentication to protect sensitive information.",
            "Kept providing data privately to each user, while focusing on privacy by utilizing (Django RESTful Framework)DRF authentication.",
          ],
          tags: ["Vue.js", "Tailwind CSS", "Laravel", "PostgreSQL"],
          date: "Feb 2017 - Sept 2017",
          webapp: "https://gavani.vn",
        },
        {
          id: "9",
          ontop: false,
          image: "/image/erp.png",
          title: "ERPNext - ERP System",
          description: "Leveraged full stack development in our ERP system to automate data entry, optimize supply chain management, and forecast inventory needs through predictive analytics. " + 
          "By harnessing machine learning, we can now predict demand fluctuations and adjust inventory levels proactively.",
          tags: ["Flask", "React", "Electron", "ERP Platform", "ERPNext"],
          responsibilities: [
            "Designed seamless and user-friendly UI suitable to business goal - sale of computer.",
            "Implemented complex backend(Flask) logic for inventory & sale forecast management, and established robust backend system.",
            "Designed efficient model for storing and handing various type of data, and integrated RESTful APIs of backend to frontend(React).",
          ],
          date: "Mar 2016 - Jun 2017",
          github: "https://github.com/tech-master823/erp-system",
        }, 
        {
          id: "6",
          ontop: 0,
          image: "/image/fahertybrand.jpeg",
          title: "AI Assistant for Fahertybrand",
          description: "Crafted an innovative AI-powered assistant chatbot for Fahertybrand, an American clothing sales e-commerce platform, " + 
          "that revolutionized the user search experience. Enhanced the platform's ability to seamlessly connect shoppers with their desired products, " + 
          "resulting in a significant boost in user engagement and overall satisfaction. ",
          responsibilities: [
            "Researched and Selected about LLM and its framework suitable to be used for integrate AI chatbot to Fahertybrand's existing e-commerce systems.",
            "Extract key informations from existing e-commerce system, and store it to Vector Database - Pinecone for trainning LLM.",
            "Established RAG system for integrating AI chatbot to platform, by uilizing  Langchain, GPT model and LLaMA."
          ],
          tags: ["Django", "React.js", "Firebase", "RAG", "GPT", "Pinecone", "Langchain", "LLaMA"],
          date: "Feb 2018 - Nov 2018",
          webapp: "https://www.fahertybrand.com"
        }, 
        {
          id: "2",
          ontop: 1,
          image: "/image/healthcare.png",
          title: "Health.ai - AI-Powered Healthcare Consulting System",
          description: "Innovative AI Assistant system be able to medical consultant with patient based on rich expert medical knowledge. " + 
          "Simulating a dialogue with the patient can offer tailored health advice, suggest diagnoses, " + 
          "and recommend actions based on their specific symptoms and medical history.",
          responsibilities: [
            "Designed modern and seamless UI for showing AI assistant' s response more visually and comfortable with Next.js.",
            "Implemented entire RAG architecture for AI healthcare assistant system, and embeded AI Speech-To-Text and Text-To-Speech feature.",
            "Established large amount of meidcal knowledge base, and trained GPT model with it, by utilizing Langchain, LLaMA and Vector DB(Pinecone).",
          ],
          tags: ["FastAPI", "Langchain", "ChatGPT", "LLaMA", "RAG", "Pinecone", "Next.js"],
          date: "Nov 2021 - Apr 2022",
          webapp: "https://health.ai",
          github: "https://github.com/tech-master823/Healthcare-consulting-system"
        },
        {
          id: "3",
          ontop: 1,
          image: "/image/image-generator.png",
          title: "AI-Powered Art Generation Platform",
          description: "Developed and launched a cutting-edge AI Art Service platform utilizing the Stable Diffusion model and GANs, " + 
          "allowing users to effortlessly do anything related to smart art with simple text prompts and unlocking unparalleled creative possibilities " + 
          "for digital art, advertising, and marketing.",
          tags: ["Django RESTful Framework(DRF)", "React", "OpenAI", "Stable Diffusion", "GAN"],
          responsibilities: [
            "Made sure detailed requirements of entire project, and designed seamless and user-friendly frontend with Next.js",
            "Built Python based backend - Django for integrating Stable Diffusion model, and made RESTful API for communicating between frontend and backend.",
            "Developed various art service such as AI Image Genearation, Upscaler, Uncroper, etc by utilizing Generative Adversarial Network(GAN).",
          ],
          date: "Mar 2023 - Feb 2024",
          webapp: "https://www.piclumen.com/"
        }, 
        {
          id: "4",
          ontop: 0,
          image: "/image/virtual-voice-assistant.png",
          title: "Virtual Voice Assistant",
          description: "A virtual voice assistant that can help you with a variety of tasks. " + 
          "This project utilizes machine learning and natural language processing to create a natural and intuitive experience for users. " + 
          "With Virtual Voice Assistant, it will enable you to can easily interact with your computer by simply speaking to it.",
          responsibilities: [
            "Researched the most suitable STT AI model to be integrated to system, architectured system based AssemblyAI service.",
            "Made capability between AssemblyAI' s LaMUR model and LLM (LLaMA 3), compleleted that integration of it.",
            "Strengthen natural language understanding ability of system, by utilizing GPT model, increased fixiblility of response act."
          ],
          tags: ["Python", "OpenAI", "NLP", "AI Agent", "Speech-to-Text", "React"],
          date: "Apr 2021 - Aug 2021",
          github: "https://github.com/tech-master823/AI-voice-assistant",
        },
        {
          id: "5",
          ontop: 1,
          image: "/image/YATMATCH.png",
          title: "YATMATCH",
          description: "Yatmatch is a platform which brings yachts and people together. " + 
          "This is for Owners, buyers and brokers. The platform does provide other automation settings and tools to help user find potential buyer or seller.",
          responsibilities: [
            "Architectured entire system, and designed and implemented seamless and user-friendly frontend with React.",
            "For efficient data flow management, Established Object Relation Mapping(ORM) system, entirely by utilizing SQLAlchemy + AsyncIO.",
            "Kept providing data privately to each user, while focusing on privacy by utilizing (Django RESTful Framework)DRF authentication.",
          ],
          tags: ["Nest.js","React", "Tailwind CSS", "PostgreSQL"],
          date: "Mar 2017 - Nov 2017",
          webapp: "https://yatmatch.com/"
        },
        {
          id: "7",
          ontop: 1,
          image: "/image/kyber.jpg",
          title: "Kyber - AI workflow for insurance industry",
          description: "AI-driven workflow designed for the insurance industry, focusing on the drafting, reviewing, and sending of complex insurance notices. " + 
          "Built specifically for claims adjusters and insurance professionals, it streamlines the notice creation process by enabling users to create and " + 
          "customize documents using ready-made or bespoke templates.",
          responsibilities: [
            "Developed Kyber' s AI Copilot as GenAI - RAG powered editing assistant by utilizing LangChain, and GPT model.",
            "Based on detailed requirements, Improved editing and refining Claim Notice by integrating AI Copilot to Kyber platform.",
            "Completed various innovative features, including choosing Claim template, pre-fill information based on previous information.",
          ],
          tags: ["Django", "React", "Pytorch", "Langchain", "ChatGPT", "Pinecone", "MongoDB"],
          date: "Nov 2021 - Apr 2022",
          webapp: "https://www.askkyber.com/"
        },
        {
          id: "8",
          ontop: 0,
          image: "/image/chatbotsoc.png",
          title: "ChatSoc",
          description: "Developed 'ChatSoC,' an advanced chatbot using OpenAI's API in Python, " + 
          "featuring capabilities such as text-to-voice output, voice-to-text input, " + 
          "QR login mechanism using OpenCV, AI image generation with DALL-E, YouTube video downloading, and Wikipedia content referencing.",
          responsibilities: [
            "Developed backend logic using Python to power chatbot functionalities.",
            "Integrated OpenAI API for conversational AI and DALL·E for AI-generated image capabilities.",
            "Developed a QR login system for secure user access and integrated a YouTube video downloading feature."
          ],
          tags: ["Python", "NLP", "OpenAI GPT", "Langchain", "DALL-E", "Pinecone"],
          date: "Jul 2023 - Sept 2023",
          github: "https://github.com/tech-master823/ChatSoc",
        },
      ],
      education: [
        {
          id: "1",
          school: "FGV/EBAPE",
          degree: "Master of Technology - MTech, Artificial Intelligent",
          img: "/icons/fgv-university.jfif",
          date: "Aug 2020 – Nov 2021",
          grade: "3.6/4.0",
          desc: "In this course, I focused on developing an AI web service platform using " + 
          "technologies like OpenAI, GPT, LLM, and Machine Learning, enhancing user experience and automating tasks through projects and collaboration with peers, " + 
          "focusing on natural language processing and computer vision for customized services."
        },
        {
          id: "2",
          school: "Can Tho University of Technology",
          degree: "Bachelor of Computer Science (UNIPAMPA)",
          img: "/icons/can-tho-university.png",
          date: "Mar 2008 – Dec 2012",
          grade: "3.7/4.0",
          desc: "I gained in-depth knowledge of programming languages like C++, Python, PHP, C#, Java and JavaScript, " + 
          "dedicating significant effort to mastering Python and its scientific libraries, " + 
          "while also exploring backend technologies like Django and Flask to enhance my web development skills."
        },
      ],
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
