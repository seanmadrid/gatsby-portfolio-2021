import React from "react"
import SeanPortrait from '../images/new_portrait.jpg'
import SEO from "../components/seo"


const AboutPage = () => (
  <div>
      <SEO title="Some Stuff About Sean Madrid" />
      <div className="about-me">
        <div id="aboutImage" className="about-image">
          <img className="sean-portrait" src={SeanPortrait} alt="The reliable face of Sean Madrid"/>
        </div>
        <div className="about-text">
          <h1 className="header-l">About Me</h1>
          <p>I have over six years of experience as a freelance web developer and as a team member of a digital creative agency. My vast understanding of WordPress and practices in web development, combined with my evolving knowledge of design processes, makes me a valuable contributor and thoughtful collaborator on any project. I have experience developing web applications in React.js.</p>
          <p>I am a film and art enthusiast who seeks new and exciting ways to convey information. My undying curiosity for knowing how to do things makes me a perpetual problem solver. As a designer, I possess a constant need to explore and test new possibilities.</p>
        </div>
      </div>
  </div>
)

export default AboutPage
