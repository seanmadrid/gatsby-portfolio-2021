import React from "react";
import PropTypes from "prop-types";
import WorkButtons from "../components/work-buttons";
import { graphql, Link } from "gatsby";

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

    let size = 4;
    
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
    const projects = this.state.projects
    return (
      <div className="project-index other-projects">
        <h2>More Projects</h2>
        <div className="flex">
          {projects &&
            projects.map((project, n) => {
              
              let live_url = project.workFields.liveUrl ? project.workFields.liveUrl.url : "";
              let code_url = project.workFields.codeUrl ? project.workFields.codeUrl.url : "";
              let story_link = "/work/" + project.slug;
              
              return (
                <div key={n} className="single-project">
                  <div className="image-wrapper">
                    <Link to={story_link} className="image-link">
                      <img
                        className="featured-project-image"
                        src={project.featuredImage.node.sourceUrl}
                        alt={project.featuredImage.node.altText}
                      />
                    </Link>
                  </div>
                  <div className="title-box">
                    <h3 className="header-sm project-title">{project.title}</h3>
                    <span
                      className="excerpt"
                      dangerouslySetInnerHTML={{ __html: project.excerpt }}
                    ></span>
                    
                    <WorkButtons
                      viewLink={live_url}
                      codeLink={code_url}
                      storyLink={story_link}
                      color="#FF1493"
                    />
                  </div>
                </div>
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
      liveUrl = project.workFields.liveUrl;
      codeUrl = project.workFields.codeUrl;
      currentProject = project;
    }

    return (
      <>
        <div className="single-project-wrap">
          <h1 className="header-l">{title}</h1>
          <WorkButtons viewLink={liveUrl} codeLink={codeUrl} storyLink="" />
          <div
            className="project-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <WorkButtons viewLink={liveUrl} codeLink={codeUrl} storyLink="" />
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
