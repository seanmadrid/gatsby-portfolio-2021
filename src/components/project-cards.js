import React from "react"
import WorkButtons from "./work-buttons";
import { Link } from 'gatsby'

export default class ProjectCard extends React.Component {

    constructor() {
        super();

        this.state = {
            hovered: false,
            mounted: false
        }
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    hoverOn() {
        this.setState({ hovered: true });
    }

    hoverOff() {
        this.setState({ hovered: false });
    }
    render() {
        return (
            <div className={`single-project${this.state.hovered ? ' hovered' : ''}`}>
                <Link to={this.props.storyLink} onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} >
                    <div className="image-wrapper">
                        <img className="featured-project-image" srcSet={this.props.imgSrcSet.srcSet} sizes={this.props.imgSrcSet.srcSet.sizes} src={this.props.imageSrc} alt={this.props.imgAlt} />
                    </div>
                    <div className="title-box">
                        <h3 className="header-sm project-title">{this.props.title}</h3>
                        <span className="excerpt" dangerouslySetInnerHTML={{ __html: this.props.excerpt }}></span>
                    </div>
                </Link>                
                
                <WorkButtons viewLink={this.props.viewLink} codeLink={this.props.codeLink} storyLink={this.props.storyLink} color="#F04B82" onReadEnter={this.hoverOn} onReadLeave={this.hoverOff} single={false} />
                
            </div>
        );
    }
}