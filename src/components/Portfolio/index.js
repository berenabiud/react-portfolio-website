import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getPortfolioItems } from '../../firebase'; // Import the function we created

const Portfolio = () => { 
  const [letterClass, setLetterClass] = useState('text-animate');
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolioItems = await getPortfolioItems();
        setPortfolio(portfolioItems);
      } catch (err) {
        setError("Failed to load portfolio. Please try again later.");
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const renderPortfolio = () => {
    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return (
      <div className="images-container">
        {portfolio.map((project) => (
          <div className="image-box" key={project.id}>
            <div className="portfolio-image-container">
              <img 
                src={project.image}
                className="portfolio-image"
                alt={project.name}
                onError={(e) => {
                  e.target.src = '/images/project-placeholder.png';
                }}
              />
              {project.tags && (
                <div className="tags-container">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="content">
              <h3 className="title">{project.name}</h3>
              <p className="description">{project.description}</p>
              <div className="links">
                {project.url && (
                  <a
                    href={project.url}
                    className="btn live-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    className="btn github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"Portfolio".split("")}
            idx={15}
          />
        </h1>
        {loading ? (
          <div className="loading-container">
            <Loader type="pacman" active />
          </div>
        ) : (
          renderPortfolio()
        )}
      </div>
    </>
  );
};

export default Portfolio;