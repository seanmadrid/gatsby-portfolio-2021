import React from "react"
import PropTypes from 'prop-types'
import WorkButtons from '../components/work-buttons'
import { graphql, Link } from 'gatsby'


class ThreeRandomProjects extends React.Component {

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
        let projects = this.props.projects.nodes;
        const remove = this.props.remove.wordpress_id;
        for (var i = 0; i < projects.length; i++) {
            let curProj = projects[i];
            if (curProj.wordpress_id === remove) {
                projects.splice(i, 1);
            }
        }
        this.shuffle(projects);
        projects.length = 4;
        return (
          <div className="project-index other-projects">
            <h2>More Projects</h2>
            <div className="flex">
            {projects && projects.map((project, n) => {

                let view_link;
                let code_link;
                let story_link;

                if(project.acf.live_url){
                  view_link = project.acf.live_url;
                }else{
                  view_link = "";
                }

                if(project.acf.code_url){
                  code_link = project.acf.code_url;
                }else{
                  code_link = ""; 
                }

                if(project.content.rendered !== "") {
                  story_link = "/work/" + project.slug;
                }else {
                  story_link = "";
                }

                return (
                  <div key={n} className="single-project">
                    <div className="image-wrapper">
                      <Link to={story_link} className="image-link" ><img className="featured-project-image" src={project.featured_media.source_url} alt={project.featured_media.alt_text}/></Link>
                    </div>
                    <div className="title-box">
                      <h3 className="header-sm project-title">{project.title}</h3>
                      <span className="excerpt" dangerouslySetInnerHTML={{__html: project.excerpt}}></span>
                      <WorkButtons viewLink={view_link} codeLink={code_link} storyLink={story_link} color="#FF1493" />
                    </div>
                  </div>
                )
              })
            }
            </div>
            <Link to="/work" className="see-all-link">See all projects ></Link>
          </div>
        );
    }
}

class SingleProject extends React.Component {
    render() {

        const project = this.props.data.wordpressWpWorks;
        console.log(project.content);
        const allProjects = this.props.data.allWordpressWpWorks;
        let view_link;
        let code_link;

        if (project.acf.live_url) {
            view_link = project.acf.live_url;
        } else {
            view_link = "";
        }

        if (project.acf.code_url) {
            code_link = project.acf.code_url;
        } else {
            code_link = "";
        }

        return (
          <>
            <div className="single-project-wrap">
              <h1 className="header-l">{project.title}</h1>
              <WorkButtons viewLink={view_link} codeLink={code_link} storyLink="" />
              <div className="project-content" dangerouslySetInnerHTML={{__html: project.content}}></div>
              <WorkButtons viewLink={view_link} codeLink={code_link} storyLink="" />
              
            </div>
            <ThreeRandomProjects projects={allProjects} remove={project} />
          </>
        );
    }
}

SingleProject.propTypes = {
    data: PropTypes.object.isRequired,
    edges: PropTypes.array,
}

export default SingleProject

export const pageQuery = graphql `
  query currentProjectQuery {
    allWpWork {
      edges {
        node {
          content
          excerpt
          id
          slug
          status
          uri
          title
          featuredImage {
            node {
              sizes
              sourceUrl
              id
              altText
              uri
              title
            }
          }
        }
      }
    }
  }`