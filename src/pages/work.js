import React from 'react'
import SEO from '../components/seo'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import ProjectCard from '../components/project-cards'


class WorkFocus extends React.Component {
  render() {
    let workfocus = " ";
    if(this.props.focus === "uxui") {
      workfocus = " UX/UI";
    }
    return (
      <span className={`work-focus-${this.props.focus}`}>{workfocus}</span>
    )
  }
} 

export default class WorkPage extends React.Component {

  constructor() {
    super();

    this.state = {
      projects: [],
      mounted: false
    }
  }

  componentDidMount() {
    const thiss = this;
    if (this.props.mount) {
      const shuffled = this.shuffle(this.props.data.allWpWork.nodes);
      this.setState({ projects: shuffled });
    }
    if(!this.state.mounted) {
      setTimeout(() => {
        thiss.setState({mounted: true});
      }, 1500);
    }
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
          <h1 className="header-l">My<WorkFocus focus="uxui" /> Work</h1>
          <div className="work-subheadline show-uxui">This is a showcase of my work as a UX/UI designer.</div>
          <div className={`flex${this.state.mounted ? " mounted" : ""}`}>
            {projects && projects.map((project, n) => {
              let tags = "";
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

              if(project.tags.nodes.length > 0) {
                for(let t = 0; t <= project.tags.nodes.length - 1; t++) {
                  let tagslug = project.tags.nodes[t].slug;
                  if(tagslug !== "featured") {
                    if(tags === "") {
                      tags = "tag-" + tagslug;
                    }else {
                      tags += " tag-" + tagslug;
                    }
                  }
                }
              }
              return (
                <ProjectCard key={n} storyLink={story_link} codeLink={code_link} viewLink={view_link} imgSrcSet={iss} imgSrc={imageSrc} imgAlt={project.featuredImage.node.altText} title={project.title} excerpt={project.excerpt} single={false} tags={tags} />
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
  data: PropTypes.object,
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
      tags {
        nodes {
          slug
        }
      }
    }
  }
}
`