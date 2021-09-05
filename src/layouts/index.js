import React from "react"
import { Helmet } from "react-helmet"
import Transition from "../components/transition"
import Header from "../components/header"
import "../scss/main.scss"
import VantaWaves from "../components/waves"

const TemplateWrapper = ({ children, location }) => {

  return (
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
        <Header location={location.pathname} />
        <Transition location={location}>{children}</Transition>
      </div>
    </div>
  )
}

export default TemplateWrapper
