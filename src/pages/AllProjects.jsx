import React, { Suspense, lazy, useEffect } from 'react';
import ProjectDetails from '../components/ProjectDetails';
import Footer from '../components/Footer';
import Header from '../components/Header/Header.jsx';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

// Lazy load components
const Projects = lazy(() => import('../components/Projects'));

const ProjectsSection = styled.div`
  padding-top: 80px;
  background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 60.83%);
`;

function AllProjects({ firebaseData, openModal, setOpenModal }) {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects</title>
        <meta name="description" content="BE REAL - the portfolio of Gustavo Oliveira P, showcasing Web, Machine Learning, Deep Learning, and Python projects." />
        <meta name="keywords" content="BE REAL, Gustavo Oliveira P, AI/ML, Web Development, Portfolio, Projects, sibi, siddharth" />
        <meta name="author" content="Gustavo Oliveira P" />
        <link rel="canonical" href="https://sibisiddharth8.github.io/portfolio-react/#/AllProjects" />

        {/* Open Graph Data */}
        <meta property="og:title" content="BE REAL - Gustavo Oliveira P Portfolio | Projects" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sibisiddharth8.github.io/portfolio-react/#/AllProjects" />
        <meta property="og:image" content="https://sibisiddharth8.github.io/portfolio-react/Og-card-banner-SibiSiddharthS.png" />
        <meta property="og:description" content="Explore projects developed by Gustavo Oliveira P, showcasing skills in AI/ML and Web Development." />

        {/* Twitter Card Data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BE REAL - Projects" />
        <meta name="twitter:description" content="Explore projects developed by Gustavo Oliveira P." />
        <meta name="twitter:image" content="https://sibisiddharth8.github.io/portfolio-react/Og-card-banner-SibiSiddharthS.png" />
      </Helmet>

      <Header 
        Title="Projects Page"
      />
      <ProjectsSection>
        <Suspense>
          <Projects 
            projectsData={firebaseData.projects || []} 
            openModal={openModal} 
            setOpenModal={setOpenModal} 
            defaultfilter="all"
            // projectFilters={['all', 'Web', 'Deep Learning', 'Machine Learning']}
            ViewAllCard={0}
            ShowTitle={null}
            IntroText={1}
          />
        </Suspense>

        {openModal.state && (
          <ProjectDetails 
            projectsData={firebaseData.projects || []} 
            openModal={openModal} 
            setOpenModal={setOpenModal} 
          />
        )}

        <Footer 
          footerData={firebaseData.Bio || {}} 
        />
      </ProjectsSection>
    </>
  );
}

export default AllProjects;
