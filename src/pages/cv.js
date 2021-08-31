import React from "react"
import SEO from "../components/seo"
import ResumeImg from '../images/Sean_Madrid_CV.jpg';

const resumeURL = "https://drive.google.com/file/d/1ayf0CDDloegX_2PICl_vaumOBcSP2BvG/view?usp=sharing";
const resumeDownload = "https://drive.google.com/uc?export=download&id=1ayf0CDDloegX_2PICl_vaumOBcSP2BvG"

const ResumePage = () => (
  <div>
    <SEO title="Sean Madrid's Resume" />
	<div className="resume">
		<a href={resumeURL} target="_blank" rel="noopener noreferrer" >
			<img src={ResumeImg} alt="Sean Madrid's Resume" />
		</a>
	</div>
	<div className="resume-buttons">
		<a href={resumeURL} target="_blank" rel="noopener noreferrer" className="view"><span>View PDF</span></a>
		<a href={resumeDownload} className="download" download><span>Download PDF</span></a>
	</div>  
  </div>
)

export default ResumePage