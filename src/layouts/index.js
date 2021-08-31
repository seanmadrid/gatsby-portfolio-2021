import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Transition from "../components/transition"
import Header from "../components/header"
import "../scss/main.scss"
import VantaWaves from "../components/waves"

const Spheres = () => {

  const [position, setPosition] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = e => {
    setScrollY(window.scrollY);
    const negScroll =  window.scrollY / 50 * -1
    setPosition(negScroll);
  }

  useEffect(() => {
    window.addEventListener("scroll", e => handleScroll(e))
    return () => {
      window.removeEventListener("scroll", e => handleScroll(e))
    }
  });

  const sphereStyle = {}

  return (
    <div className="spheres-wrapper">
      <style>{`:root { --position: ${position}% } `}</style>
      <div className="item item--sphere item--color1"></div>
      <div className="item item--sphere item--color2"></div>
    </div>
  )
}

const TemplateWrapper = ({ children, location }) => (
  <div>
    <Helmet
      title="Sean Madrid: Developer / UX Designer"
      meta={[
        { name: `description`, content: `Sample` },
        { name: `keywords`, content: `sample, something` },
      ]}
    ></Helmet>
    <div className="layout-wrapper">
      <VantaWaves /> 
      {/* <Spheres /> */}
      <Header />
      <Transition location={location}>{children}</Transition>
    </div>
  </div>
)

export default TemplateWrapper
