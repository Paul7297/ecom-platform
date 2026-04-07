import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
// Import future components
// import Stats from '../../components/Stats';
// import Categories from '../../components/Categories';
// import Programs from '../../components/Programs';
// import QuickLinks from '../../components/QuickLinks';
// import Blog from '../../components/Blog';


const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section - To be implemented */}
      <section className="stats-section py-5 bg-light">
        <Container>
          {/* Stats component will go here */}
          <p>Stats section coming soon...</p>
        </Container>
      </section>
      
      {/* Categories Section - To be implemented */}
      <section className="categories-section py-5">
        <Container>
          {/* Categories component will go here */}
          <p>categories section coming soon...</p>
        </Container>
      </section>
      
      {/* Programs Section - To be implemented */}
      <section className="programs-section py-5 bg-light">
        <Container>
          {/* Programs component will go here */}
          <p>programs section coming soon...</p>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Features />
        </Container>
      </section>

      
      
      {/* Quick Links Section - To be implemented */}
      <section className="quick-links-section py-5 bg-light">
        <Container>
          {/* Quick links component will go here */}
          <p>quick section coming soon...</p>
        </Container>
      </section>
      
      {/* Blog Section - To be implemented */}
      <section className="blog-section py-5">
        <Container>
          {/* Blog component will go here */}
          <p>blog section coming soon...</p>
        </Container>
      </section>
    </main>
  );
};

export default Home;