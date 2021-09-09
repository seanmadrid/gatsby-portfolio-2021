import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"

const IndexPage = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  });

  return (
    <div>
      <SEO title="Home" />
      <div className={`view-start${loaded ? " loaded" : ""}`}>
        <h1>Sean Madrid</h1>
        <h2>Frontend Developer / UX Designer</h2>
        <h3>Implementing big picture ideas, technical solutions, and a sense of style digital projects.</h3>
        <Link to="/work" className="single-button">See My Work ></Link>
      </div>
    </div>
  );
}

export default IndexPage
