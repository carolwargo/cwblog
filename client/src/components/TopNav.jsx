import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
  // State for controlling navbar toggle
  const [expanded, setExpanded] = useState(false);

  // State for controlling dropdown open/close
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDropdownToggle = (dropdown) => {
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown);
  };

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      fixed="top" 
      expanded={expanded} 
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://fullcircledigital.ca/wp-content/uploads/2021/02/logo-black.png"
            height="40"
            className="d-inline-block align-top"
            alt="Full Circle Digital"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              title="Services"
              id="services-dropdown"
              show={dropdownOpen === 'services'}
              onMouseEnter={() => handleDropdownToggle('services')}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <NavDropdown.Item href="/services/web-development" onClick={() => setExpanded(false)}>
                Web Development
              </NavDropdown.Item>
              <NavDropdown.Item href="/services/seo" onClick={() => setExpanded(false)}>
                SEO
              </NavDropdown.Item>
              <NavDropdown.Item href="/services/content-creation" onClick={() => setExpanded(false)}>
                Content Creation
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Portfolio"
              id="portfolio-dropdown"
              show={dropdownOpen === 'portfolio'}
              onMouseEnter={() => handleDropdownToggle('portfolio')}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <NavDropdown.Item href="/portfolio/websites" onClick={() => setExpanded(false)}>
                Websites
              </NavDropdown.Item>
              <NavDropdown.Item href="/portfolio/branding" onClick={() => setExpanded(false)}>
                Branding
              </NavDropdown.Item>
              <NavDropdown.Item href="/portfolio/case-studies" onClick={() => setExpanded(false)}>
                Case Studies
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Blog"
              id="blog-dropdown"
              show={dropdownOpen === 'blog'}
              onMouseEnter={() => handleDropdownToggle('blog')}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <NavDropdown.Item href="/blog/web-design" onClick={() => setExpanded(false)}>
                Web Design
              </NavDropdown.Item>
              <NavDropdown.Item href="/blog/seo-tips" onClick={() => setExpanded(false)}>
                SEO Tips
              </NavDropdown.Item>
              <NavDropdown.Item href="/blog/digital-marketing" onClick={() => setExpanded(false)}>
                Digital Marketing
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="About"
              id="about-dropdown"
              show={dropdownOpen === 'about'}
              onMouseEnter={() => handleDropdownToggle('about')}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <NavDropdown.Item href="/about/our-story" onClick={() => setExpanded(false)}>
                Our Story
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/team" onClick={() => setExpanded(false)}>
                Team
              </NavDropdown.Item>
              <NavDropdown.Item href="/about/careers" onClick={() => setExpanded(false)}>
                Careers
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>

            <NavDropdown
              title="More"
              id="more-dropdown"
              show={dropdownOpen === 'more'}
              onMouseEnter={() => handleDropdownToggle('more')}
              onMouseLeave={() => handleDropdownToggle(null)}
            >
              <NavDropdown.Item href="/privacy-policy" onClick={() => setExpanded(false)}>
                Privacy Policy
              </NavDropdown.Item>
              <NavDropdown.Item href="/terms-conditions" onClick={() => setExpanded(false)}>
                Terms & Conditions
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
