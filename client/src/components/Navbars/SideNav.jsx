import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "emailjs-com";
import {
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import LoginBW from '../assets/images/Server/LoginBW.png'
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


function SideNav() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using Email.js
    const templateParams = {
      email_address: email,
    };

    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      templateParams,
      "YOUR_USER_ID"
    )
    .then((response) => {
      console.log("Email sent successfully!", response);
      alert("Thank you for subscribing!");
    })
    .catch((error) => {
      console.error("Email failed to send!", error);
      alert("Oops! Something went wrong. Please try again.");
    });

    // Reset form
    setEmail("");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation triggers only once
    threshold: 0.1, // Percentage of the div that needs to be visible to trigger the animation
  });
  return (
    <div className="forms" id="forms">
      <motion.div
        ref={ref}
        initial={{ y: -20, opacity: 0.5 }}
        animate={inView ? { y: 0, opacity: 1} : {}}
        exit={{ y: 20, opacity: 0.5 }}
        transition={{ duration: 0.8 }}
    style={{fontFamily:'proxima-nova'}}
    >
      
    <div className='w3-padding-top-48'>
      {/* Side Navigation */}
      <nav className={`w3-sidebar w3-bar-block w3-card w3-animate-top w3-center w3-padding-64 ${isOpen ? 'w3-show' : 'w3-hide'}`} style={{ zIndex: '999', width: '100%', position: 'fixed', top: '0' }}>
        <p className="w3-xxxlarge ">Web Forms</p>
        <button className="w3-bar-item w3-button w3-large" onClick={toggleSidebar}>Close <i className="fa fa-remove w3-large"></i></button>
     <a href="#authentication" className="w3-bar-item w3-button w3-xxlarge">Authentication</a>
        <a href="#authorization" className="w3-bar-item w3-button w3-xxlarge">Authorization</a>
        <a href="#subscribe" className="w3-bar-item w3-button w3-xxlarge"><i>Subscription</i></a>
      </nav>

      {/* Header */}
      <header className="w3-container w3-theme w3-padding w3-padding-24 w3-black" id="myHeader">
      <div className="w3-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
       
        <div className="w3-padding-64">
          <button className="w3-btn w3-large w3-hover-light-grey shadow w3-round-xxlarge"  onClick={toggleSidebar} style={{ fontWeight: "400", backgroundColor:'#FF385C', color:'white' }}> <i className="fa fa-bars w3-large w3-margin-right" ></i>Web Forms</button>
        </div>
      </div>
    </header>
    </div>
 {/**Start webforms intro*/}
<div className='w3-content w3-container'>
<div className='w3-padding-top-32 text-center text-black'>
  <h1>WEB FORMS</h1>
  <h3>Web forms offer a powerful way to engage with your audience, collect data, and enhance user experience on your website.</h3>
  </div>
  {/**Start webforms rows*/}
<div className="row d-flex w3-padding-32 justify-content-center align-items-center"
id='web-components'>
   {/**Start webforms image col*/}
<div className='col-sm-12 col-md-6 col-lg-6 flex-column justify-content-center text-black w3-padding-large'>
<img src={LoginBW} alt='login-form' style={{width:'100%',border: '2px solid #FF385C' }} className='shadow  w3-round-large'></img>
</div>
{/**Start webforms content col*/}
<div className='col-sm-12 col-md-6 col-lg-6 flex-column justify-content-center align-items-center text-black w3-padding-large'>
<h4>BENEFITS OF WEB FORMS</h4>
<ol style={{fontSize:'14px'}}>
<li><b>Automated Processes: </b> Integration with databases and CRM systems reduces manual entry, streamlining 
workflows.
</li>
    <li><b>Data Collection:</b> Web forms collect contact details, feedback, survey responses, and more efficiently.
    </li>
<li><b>User Engagement & Convenience:</b> Boost engagement and easy information submission, saving time for users and businesses.</li>
<li><b>Analytics and Insights:</b> Track form submissions and user behavior to gain valuable user insights.</li>
<li><b>Lead Generation:</b> Capture user information to generate leads and build a potential customer database.</li>
</ol>
<br />
<p >Commonly utilized web forms include contact forms, registration forms, feedback forms, subscription forms, order forms, and survey forms.</p>
</div>
</div>
</div>


      <div className="w3-container w3-content w3-padding-48 w3-padding-large" id='subscribe'>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="flex-column col-sm-12 col-md-6 col-lg-6 justify-content-center ">
            <div className="container w3-white">
            <h3 >
                <b className="fw-bold" style={{color:'#FF385C'}}>Subscription</b> Form
              </h3>
              <hr className="w3-opacity" />
              <p className="text-black">
              Subscription forms are used to capture a User's contact information. 
 By submitting the form, users consent to receive communications from the website or service. A way 
  to build and maintain a mailing list of interested users or customers.{" "}
             {" "}
              </p>
              <br />
            </div>
          </div>
     
       
         <div className="flex-column col-sm-12 col-md-6 col-lg-6 justify-content-center align-items-center">
  
        {/**End subscribe content */}
        <div className='w3-container '>
         <div className="w3-card w3-padding w3-padding-24 w3-light-gray w3-round-large">
       
            <form onSubmit={handleSubmit}>
              <MDBRow className="d-flex justify-content-center ">
                <div md="8" size="12" >
                  <MDBInput
                    type="email"
                    id="user_email"
                    className='bg-white border border-black border-3 '
                    label="Email address"
                    contrast
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    labelStyle={{ fontSize: '13px', color:'black' }} 
                  />
                  <MDBCheckbox className='w3-white border-black'
        wrapperClass='d-flex w3-margin-top link-offset-1-hover mt-2'
        id='form5Example3'
        label={
          <span >
            I agree to the <a href="/terms-and-conditions" className="text-decoration-underline text-black">terms & conditions</a>.
          </span>
        }
        defaultChecked
        required
        labelStyle={{ fontSize: '13px', color:'black' }} 
      />
    
                </div>
                <div md="4" size="12" >
                  <MDBBtn color="dark" type="submit" className='mt-2'>
                    Subscribe
                  </MDBBtn>
                </div>
              </MDBRow>
            </form>
            </div>
            </div>
            </div>  
            </div>
            </div>
<div className='w3-black vw-100 w3-padding-48'>
<div className="container w3-content d-flex justify-content-center">
  <br />
  <div className="row d-flex text-center justify-content-center align-items-center w3-padding-large">
    <div>
      <h3><span style={{color:'#FF385C'}}><b>THE BENEFITS.</b><br /></span> Stats that support the importance of capturing an email...</h3>
    </div>
    <div className='col-sm-12 col-md-3 col-lg-3 d-flex flex-column align-items-center justify-content-center text-black g-3'>
      <Card style={{ height: '14rem', backgroundColor:'#FF385C', color:'white' }} >
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Text>
            B2B marketers report that email is the most effective channel for generating leads (HubSpot). According to OptinMonster, welcome emails have an average open rate of 82%.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    
    <div className='col-sm-12 col-md-3 col-lg-3 d-flex flex-column align-items-center justify-content-center text-black g-3'>
      <Card style={{ height: '14rem', backgroundColor:'#FF385C', color:'white' }} >
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Text>
            "80% of retail professionals cite email marketing as their top driver of customer retention. Loyal customers can be worth up to 10 times their initial purchase, as per Invesp."
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    
    <div className='col-sm-12 col-md-3 col-lg-3 d-flex flex-column align-items-center justify-content-center text-black g-3'>
      <Card style={{ height: '14rem', backgroundColor:'#FF385C', color:'white' }} >
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Text>
            Email marketing has a high (ROI), averaging around $42 for every dollar spent (DMA). Automated email campaigns generate 320% more revenue than non-automated ones. 
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    
    <div className='col-sm-12 col-md-3 col-lg-3 d-flex flex-column align-items-center justify-content-center text-black g-3'>
      <Card style={{ height: '14rem', backgroundColor:'#FF385C', color:'white' }} >
        <Card.Body className="d-flex align-items-center justify-content-center">
          <Card.Text>
            Segmented email campaigns drive a 760% increase in revenue (Campaign Monitor). Personalized subject lines increase open rates by 50% (Yes Marketing).
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  </div>
</div>

</div>

</motion.div>
        {/**Start FooterS*/}
        <div className="w3-container w3-padding-16 mt-4">
        <div className="row d-flex w3-padding-large justify-content-center align-items-center">
      
          <div className="flex-column col-sm-12 col-md-12 col-lg-12 justify-content-center align-items-center">
            <div className="container w3-white text-center w3-padding-large w3-padding-small">
           
            <h2 className="w3-text-black">

                <b className="fw-bold text-black">Card & Image Samples</b>
               
              </h2>
              <hr className="w3-opacity" />

              <h4 className="text-black">
                
                Incorporating media-rich images and cards into a website's design significantly enhances its visual appeal and usability. These elements contribute to an intuitive user experience by providing clear, engaging, and easily navigable content.
                {" "}
              </h4>
              <br />
              <p>
                {" "}
                <i>
                  <b> NOTE:</b> "Cards & Images are under development. View with
                  the understanding it's a work in progress. Thanks for your
                  patience."
                </i>
              </p>
              
              <Link
                  to="/cards"
                  className="button text-white"
                  onClick={scrollToTop}
                >
              <button
                className="w3-button w3-text-light-grey  w3-margin-right w3-round-xxlarge mt-2 w3-margin-bottom"
                style={{ backgroundColor: "#FF385C" }}
              >
                 View Card & Image Samples
              </button>
              </Link>
            </div>
          </div>
        </div>

  <footer className="text-muted py-5 position-fixed bottom-0 start-0 w-100">
          <div className="container">
            <p className="float-end mb-1">
              <a href="#forms" style={{color:'#FF385C'}}>Back to top</a>
            </p>
          </div>
        </footer>
        </div>
   {/**Start FooterS*/}
  
    </div>
  );
}

export default SideNav;

