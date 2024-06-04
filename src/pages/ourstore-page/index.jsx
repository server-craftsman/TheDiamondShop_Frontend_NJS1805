import React from 'react';
import './index.scss';

function OurstorePage() {
  return (
    <div>
      <div className="ourstorepage">
        <img src="https://www.thediamondshop.com/images/downtown.jpg" alt="Downtown" />
      </div>
      <div>
        <div className="container">
          <div className="image-section">
            <img
              src="https://www.thediamondshop.com/images/tds-about-us-history.jpg"
              alt="History"
            />
          </div>
          <div className="text-section">
            <h1>History of The Diamond Shop</h1>
            <p>
              The Diamond Shop has been serving our customers since 1926. From
              opening day to present, the goal of The Diamond Shop has been to
              provide each customer with the best experience. The Diamond Shop
              is a family owned business and is currently in the fourth
              generation of ownership.
            </p>
            <p>
              Over years of branding The Diamond Shop name has become synonymous
              with value and service within the communities we serve. Our humble
              beginnings in downtown Lewiston taught us that our customers are
              the lifeblood of the business. With this in mind we continued to
              grow our business with the goals of providing each customer the
              best service and value. With this as our goal we want to continue
              to expand our customer base and allow them all to truly experience
              The Diamond Shop.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="text-section">
            <h1>The Diamond Shop Tradition</h1>
            <p>
              Here at The Diamond Shop the main reason for our success is our
              understanding that the employees and customers are the reason for
              our continued growth. We strive to provide a work space for our
              employees that promote professional growth, personal development
              and an atmosphere that allows customers and employees alike the
              ability to enjoy their experience. The Diamond Shop relies on each
              employee to provide all customers with an experience that they
              will enjoy and remember their whole life. Our view is that when
              the employees are happy and enjoy their work, then the customers
              will likely have a memorable experience.
            </p>
            <p>
              At The Diamond Shop our tradition of excellence is carried out
              through our employees and is received by the customer.
            </p>
          </div>
          <div className="image-section">
            <img
              src="https://www.thediamondshop.com/images/classic-tradition.jpg"
              alt="Tradition"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="image-section">
            <img
              src="https://www.thediamondshop.com/images/tds-about-us-tradition-story.jpg"
              alt="Vision"
            />
          </div>
          <div className="text-section">
            <h1>Our Vision</h1>
            <p>
              The Diamond shop's vision is a jewelry store that focuses on
              building trust relationships with customers, co-workers and
              suppliers. Relationships are the reason for a loyal customer base,
              therefore we must cultivate that atmosphere within The Diamond
              Shop to portray that to all customers. Relationships and serving
              our customer showcases jewelry and gifts but mostly sells service.
              Our vision is to create an atmosphere that is inviting, that
              creates an atmosphere of service to every customer and puts
              customer service above all else.
            </p>
            <p>
              The Diamond Shop believes that if we take care of our customers
              and our employees, that they will take care of us. Our goal is to
              always make each customer our first priority by providing the best
              possible service, the best value and the best quality. We want to
              make sure that every customer we serve knows that The Diamond Shop
              is devoted to providing their best experience.
            </p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <h2>How Can We Help?</h2>
        <p>Need a watch battery, custom ring, or Appraisal?</p>
        <button>View Our Services</button>
      </div>



      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h3>Diamond Store</h3>
            <p>
            26 Le Van Viet,
              <br />
              Tan Nhon Phu A Ward,
              <br />
              Thu Duc City,
              <br />
              Ho Chi Minh City
              (208) 746-2649
            </p>
            <p>
              <strong>Store Information</strong>
            </p>
            <p>
              <strong>Our Hours</strong>
              <br />
              Monday: Closed
              <br />
              Tues - Sat: 9:30am - 5:00pm
              <br />
              Sunday: Closed
            </p>
          </div>
          <div className="footer-column">
            <h3>Main Menu</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/ourstore-page">Our Store</a>
              </li>
              <li>
                <a href="/diamond-page">Diamonds</a>
              </li>
              <li>
                <a href="/bridal-page">Bridal</a>
              </li>
              <li>
                <a href="/ring-page">Ring</a>
              </li>
              <li>
                <a href="/timepiece-page">Timepieces</a>
              </li>
              <li>
                <a href="/designer-page">Designers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Subscribe</h3>
            <p>
              Enter your email to get notified about sales and new products.
            </p>
            <form>
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">
                <img src="email-icon.png" alt="Subscribe" />
              </button>
            </form>
          </div>
          <div className="footer-column">
            <h3>Location</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.339281181677!2d106.7625251!3d10.8501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527a1fc80477b%3A0x62944f7a73c84aaf!2sVincom%20Thu%20Duc!5e0!3m2!1sen!2s!4v1688018656344!5m2!1sen!2s"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2024 Diamond Store All Rights Reserved. Website
            designed, maintained, and hosted by Punchmark.{' '}
            <a href="#">Accessibility Statement</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default OurstorePage;

