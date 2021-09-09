import React from "react"
import { Link } from 'gatsby'

class MobileMenu extends React.Component {

  constructor() {
    super();
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      opened: "closed"
    }
  }

  openMenu() {
    this.setState({
      opened: "opened"
    });
  }

  closeMenu() {
    this.setState({
      opened: "closed"
    });
  }

  render() {
    const touchClass = "not-touch";
    return (
      <div>
        <div className={`mobile-menu ${this.state.opened}`} onChange={this.closeMenu}>
          <div className="mobile-menu-wrap">
            <Link to="/" onClick={this.closeMenu} className={`home-link ${touchClass} mobile-home-link`}>
              <div className={`house ${touchClass}`}>

                <svg width="22" height="28" viewBox="0 0 22 28" id="colorful_house"><g transform="translate(3 0.45)"><rect id="Rectangle_13" data-name="Rectangle 13" width="22" height="16" transform="translate(-3 11.55)" fill="#0068f0" /><path id="Polygon_1" data-name="Polygon 1" d="M11,0,22,12H0Z" transform="translate(-3 -0.45)" fill="#f04b82" /><rect id="Rectangle_14" data-name="Rectangle 14" width="4" height="9" transform="translate(2 18.55)" fill="#ffea00" /><rect id="Rectangle_15" data-name="Rectangle 15" width="5" height="5" transform="translate(10 14.55)" fill="#8cf46d" /></g></svg>

                <svg id="light_blue_house" width="19.001" height="24.001" viewBox="0 0 19.001 24.001"><path id="Exclusion_3" data-name="Exclusion 3" d="M-1877,24h-4V10l9.5-10,9.5,10V24h-11V16h-4v8Zm7-11v4h4V13h-4Z" transform="translate(1881 0)" fill="#185ADB" /></svg>

              </div>
              <span className="text">Return Home</span>
            </Link>

            <Link to="/work" className="work-link" onClick={this.closeMenu}>Work</Link>
            <Link to="/about" className="about-link" onClick={this.closeMenu}>About</Link>
            <Link to="/cv" className="resume-link" onClick={this.closeMenu}>Resume</Link>
            <Link to="/contact" className="contact-link" onClick={this.closeMenu}>Contact</Link>
          </div>
          <div className="close" onClick={this.closeMenu}>×</div>
        </div>
        <div className="hamburger" onClick={this.openMenu}>•••</div>
      </div>
    );
  }
}

class DesktopMenu extends React.Component {
  render() {
    return (
      <div className={`menuWrap desktop-menu`}>
        <div className="menu">
          <Link to="/work" className="work-link">Work</Link>
          <Link to="/about" className="about-link">About</Link>
          <Link to="/resume" className="resume-link">Resume</Link>
          <Link to="/contact" className="contact-link">Contact</Link>
        </div>
      </div>
    );
  }
}

class ProfileIcons extends React.Component {
  render() {
    return (
      <div className="profile-icons">
        <a href="https://www.linkedin.com/in/sean-madrid" target="_blank" rel="noopener noreferrer" className="linkedin">LinkedIn</a>
        <a href="https://github.com/seanmadrid" target="_blank" rel="noopener noreferrer" className="github">GitHub</a>
        <a href="https://codepen.io/seanmadrid" target="_blank" rel="noopener noreferrer" className="codepen">Codepen</a>
      </div>
    );
  }
}

const resumeURL = "https://drive.google.com/file/d/1lb8meSbTsSgK59EekfbKLnPTu9IABZ7s/view?usp=sharing";
const resumeDownload = "https://drive.google.com/uc?export=download&id=1lb8meSbTsSgK59EekfbKLnPTu9IABZ7s";
const googleDoc = "https://docs.google.com/document/d/1hvv6_E9mQWNqKaehx1QvqJYRbEn-t0_CJ-N8yjPmYl0/edit?usp=sharing";

const ResumeLinks = (props) => (
  <div className={`resume-buttons${props.show ? " show" : " hide"}`}>
    <a href={resumeURL} target="_blank" rel="noopener noreferrer" className="view"><span>View PDF</span></a>
    <a href={resumeDownload} className="download" download><span>Download PDF</span></a>
    <a href={googleDoc} className="doc" download><span>View Google Doc</span></a>
  </div>
)

class Header extends React.Component {

  render() {

    let pathname = this.props.location.replace("/", "") !== "" ? this.props.location.replace("/", "") : "home";

    console.log(pathname);

    if (pathname.includes('work/')) {
      pathname = "single-project";
    }

    return (
      <header className={pathname}>
        <div className="logo-wrap">
          <Link to="/" onClick={this.closeMenu} className={`home-link not-touch`} >
            <div className={`house not-touch`}>
              <svg width="22" height="28" viewBox="0 0 22 28" id="colorful_house"><g transform="translate(3 0.45)"><rect id="Rectangle_13" data-name="Rectangle 13" width="22" height="16" transform="translate(-3 11.55)" fill="#0068f0" /><path id="Polygon_1" data-name="Polygon 1" d="M11,0,22,12H0Z" transform="translate(-3 -0.45)" fill="#f04b82" /><rect id="Rectangle_14" data-name="Rectangle 14" width="4" height="9" transform="translate(2 18.55)" fill="#ffea00" /><rect id="Rectangle_15" data-name="Rectangle 15" width="5" height="5" transform="translate(10 14.55)" fill="#8cf46d" /></g></svg>

              <svg id="light_blue_house" width="19.001" height="24.001" viewBox="0 0 19.001 24.001"><path id="Exclusion_3" data-name="Exclusion 3" d="M-1877,24h-4V10l9.5-10,9.5,10V24h-11V16h-4v8Zm7-11v4h4V13h-4Z" transform="translate(1881 0)" fill="#CDD9FA" /></svg>
            </div>
            <span className="text">Return Home</span>
          </Link>
        </div>
        <ProfileIcons />
        <DesktopMenu />
        <MobileMenu />
        <ResumeLinks show={pathname === "resume" ? true : false} />
      </header>
    );
  }
}

export default Header
