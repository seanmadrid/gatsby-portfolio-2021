import React from "react"
import SEO from "../components/seo"
import ResumeImg from '../images/Sean-Madrid-Resume-2021.jpg';

const resumeURL = "https://drive.google.com/file/d/1lb8meSbTsSgK59EekfbKLnPTu9IABZ7s/view?usp=sharing";

const ResumePage = () => (
	<div className="resume-page">
		<SEO title="Sean Madrid's Resume" />
		<div className="resume">
			<div className="resume-wrap">
				<a href={resumeURL} target="_blank" rel="noopener noreferrer" >
					<img src={ResumeImg} alt="Sean Madrid's Resume" />
				</a>
				{/* <iframe src="https://drive.google.com/file/d/1lb8meSbTsSgK59EekfbKLnPTu9IABZ7s/preview" width="640" height="480" allow="autoplay"></iframe> */}

			</div>
		</div>
	</div>
)

export default ResumePage