import React from "react"
import SEO from "../components/seo"
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import WorkButtons from '../components/work-buttons'

export default class WorkPage extends React.Component {

  constructor() {
    super();

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    const shuffled = this.shuffle(this.props.data.allWpWork.nodes);
    this.setState({projects: shuffled});
  }

  shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
      let x = Math.floor(Math.random() * arr.length);
      let y = Math.floor(Math.random() * arr.length);
      if (x === y) { //for dont change arr[index] with self !!!
        continue;
      }
      let temp0 = arr[x];
      arr[x] = arr[y];
      arr[y] = temp0;
    }
    return arr
  }

  render() {
    const projects = this.state.projects;
    return (
      <div>
        <SEO title="The Work of Sean Madrid" />
        <div className="project-index">
          <h1 className="header-l">My Work</h1>
          <div className="flex">
            {projects && projects.map((project, n) => {
              let view_link;
              let code_link;
              let story_link;
              const iss = project.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.sources[0];
              const imageSrc = project.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src;

              if (project.workFields.liveUrl) {
                view_link = project.workFields.liveUrl.url;
              } else {
                view_link = "";
              }

              if (project.workFields.codeUrl) {
                code_link = project.workFields.codeUrl.url;
              } else {
                code_link = "";
              }

              if (project.content.rendered !== "") {
                story_link = "/work/" + project.slug;
              } else {
                story_link = "";
              }

              return (
                <div key={n} className="single-project">
                  <div className="image-wrapper">
                    <Link to={story_link} className="image-link" ><img className="featured-project-image" srcSet={iss['srcSet']} sizes={iss['sizes']} src={imageSrc} alt={project.featuredImage.node.altText} /></Link>
                  </div>
                  <div className="title-box">
                    <h3 className="header-sm project-title">{project.title}</h3>
                    <span className="excerpt" dangerouslySetInnerHTML={{ __html: project.excerpt }}></span>
                    <WorkButtons viewLink={view_link} codeLink={code_link} storyLink={story_link} color="#F04B82" />
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    );
  }
}

WorkPage.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export const pageQuery = graphql`
  query workQuery {
    allWpWork {
      nodes {      
        title
        slug
        content
        excerpt
        featuredImage {
          node {
            altText
            srcSet
            sourceUrl
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        workFields {
          liveUrl {
            url
            title
          }
          codeUrl {
            url
            title
          }
        }
      }
    }
  }`