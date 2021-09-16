import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import ProjectCard from "../components/project-cards";
import WorkButtons from "../components/work-buttons";

class ThreeRandomProjects extends React.Component {

  constructor() {
    super();

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    const remove = this.props.remove;
    let projects = this.shuffle(this.props.projects);
    projects = projects.filter(function(project, i) {
      return project !== remove;
    });
    let size = 3;
    projects = projects.slice(0, size);
    this.setState({projects: projects});
  }

  shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
      let x = Math.floor(Math.random() * arr.length);
      let y = Math.floor(Math.random() * arr.length);
      if (x === y) {
        //for dont change arr[index] with self !!!
        continue;
      }
      let temp0 = arr[x];
      arr[x] = arr[y];
      arr[y] = temp0;
    }
    return arr;
  }

  render() {
    const projects = this.state.projects;    
    return (
      <div className="project-index other-projects">
        <h2>More Projects</h2>
        <div className="flex">
          {projects &&
            projects.map((project, n) => {
              let view_link = project.workFields.liveUrl ? project.workFields.liveUrl.url : "";
              let code_link = project.workFields.codeUrl ? project.workFields.codeUrl.url : "";
              let story_link = "/work/" + project.slug;              
              const iss = project.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.sources[0];
              const imageSrc = project.featuredImage.node.localFile.childImageSharp.gatsbyImageData.images.fallback.src;
              return (
                <ProjectCard 
                  key={n}
                  storyLink={story_link} 
                  codeLink={code_link} 
                  viewLink={view_link} 
                  imgSrcSet={iss} 
                  imgSrc={imageSrc} 
                  imgAlt={project.featuredImage.node.altText} 
                  title={project.title} 
                  excerpt={project.excerpt} />
              );
            })}
        </div> 
        <Link to="/work" className="see-all-link">
          See all projects >
        </Link>
      </div>
    );
  }
}

class SingleProject extends React.Component {

  constructor() {
    super();

    this.state = {
      project: [],
      allProjects: [],
      path: ""
    }
  }

  componentDidMount() {
    let path = "";
    let project = [];
    const allP = this.props.data.allWpWork.nodes;

    if(this.props.path) {
      path = this.props.path;
    }

    if(allP) {
      var proj = this.props.data.allWpWork.nodes.filter(function(work){
        return work.slug === path.replace("/work/", "") ? work : "";
      });
      project = proj[0];
      this.setState({project: project, path: path, allProjects: allP});
    }
  }

  render() {

    let content = "";
    let title = "";
    let liveUrl = "";
    let codeUrl = "";
    let currentProject = [];

    const project = this.state.project;

    if(project.length !== 0) {
      content = project.content;
      title = project.title;
      liveUrl = project.workFields.liveUrl ? project.workFields.liveUrl.url : "";
      codeUrl = project.workFields.codeUrl ? project.workFields.codeUrl.url : "";
      currentProject = project;
    }

    return (
      <>
        <div className="single-project-wrap">
          <h1 className="header-l">{title}</h1>
          <WorkButtons viewLink={liveUrl} codeLink={codeUrl} storyLink="" single={true}/>
          <div
            className="project-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <WorkButtons viewLink={liveUrl} codeLink={codeUrl} storyLink="" single={true}/>
        </div>
        { this.state.allProjects.length > 0 &&
          <ThreeRandomProjects projects={this.state.allProjects} remove={currentProject} />
        }        
      </>
    );
  }
}

SingleProject.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
};

export default SingleProject;

export const pageQuery = graphql`
query innerWorkQuery {
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
}
`;
