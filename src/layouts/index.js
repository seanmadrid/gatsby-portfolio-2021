import React from "react"
import { Helmet } from "react-helmet"
import Transition from "../components/transition"
import Header from "../components/header"
import "../scss/main.scss"
import VantaWaves from "../components/waves"

const TemplateWrapper = ({ children, location }) => {

  const focus = location.search ? location.search.replace("?focus=", "") : "";

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
        <VantaWaves color="#E9FF91" />
        <Header location={location.pathname} focus={focus}/>
        <Transition location={location}>{children}</Transition>
      </div>
    </div>
  )
}

export default TemplateWrapper
