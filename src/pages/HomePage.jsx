import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import AuthPopup from "../auth/AuthPopup";

function HomePage(props) {
  const [userEmail, setUserEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const onEmailChange = (e) => {
    const { value } = e.target;
    setUserEmail(value);
  };

  const handleGetStarted = () => {
    setIsRegister(true);
  };
  const handleSignIn = () => {
    setIsRegister(false);
  };

  return (
    <>
      <header className="showcase">
        <div className="header-wrapper">
          <div className="header">
            <img
              src="https://i.ibb.co/r5krrdz/logo.png"
              alt="Netflix"
              className="header-logo"
            />
            <span className="header-btn" data-bs-toggle="modal"
                  data-bs-target="#auth-popup" onClick={handleSignIn}>
              Sign In
            </span>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content">
            <h1 className="content-title">
              Unlimited movies, TV shows, and more.
            </h1>
            <h2 className="content-subtitle">
              Watch anywhere. Cancel anytime.
            </h2>
            <div className="email-form">
              <h3 className="email-form-title">
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
              <div className="email-form-input">
                <input
                  type="email"
                  placeholder="Email address"
                  className="email-form-text"
                  onChange={onEmailChange}
                />
                <button
                  type="submit"
                  className="email-form-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#auth-popup"
                  onClick={handleGetStarted}
                >
                  <span className="btn-text">
                    Get started
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="story-wrapper">
        <div className="story">
          <div className="story-text">
            <h1 className="story-title">Enjoy on your TV.</h1>
            <h2 className="story-subtitle">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </h2>
          </div>
          <div className="story-img-container">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
              alt="TV"
              className="story-img"
            />
          </div>
        </div>
      </section>

      <section className="story-wrapper">
        <div className="story-reverse">
          <div className="story-text-reverse">
            <h1 className="story-title">
              Download your shows to watch offline.
            </h1>
            <h2 className="story-subtitle">
              Save your favorites easily and always have something to watch.
            </h2>
          </div>
          <div className="story-img-container">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
              alt="TV"
              className="story-img"
            />
          </div>
        </div>
      </section>

      <section className="story-wrapper">
        <div className="story">
          <div className="story-text">
            <h1 className="story-title">Watch everywhere.</h1>
            <h2 className="story-subtitle">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV without paying more.
            </h2>
          </div>
          <div className="story-img-container">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
              alt="TV"
              className="story-img"
            />
          </div>
        </div>
      </section>

      <footer className="footer-wrapper">
        <div className="footer">
          <p className="footer-top">
            Questions? Call{" "}
            <Link href="tel:1-844-505-2993">1-844-505-2993</Link>
          </p>
          <ul className="footer-structure">
            <li>
              <Link to="/">FAQ</Link>
            </li>
            <li>
              <Link to="/">Help Center</Link>
            </li>
            <li>
              <Link to="/">Account</Link>
            </li>
            <li>
              <Link to="/">Media Center</Link>
            </li>
            <li>
              <Link to="/">Investor Relations</Link>
            </li>
            <li>
              <Link to="/">Jobs</Link>
            </li>
            <li>
              <Link to="/">Redeem Gift Cards</Link>
            </li>
            <li>
              <Link to="/">Buy Gift Cards</Link>
            </li>
            <li>
              <Link to="/">Ways To Watch</Link>
            </li>
            <li>
              <Link to="/">Terms Of Use</Link>
            </li>
            <li>
              <Link to="/">Privacy</Link>
            </li>
            <li>
              <Link to="/">Cookie Preferences</Link>
            </li>
            <li>
              <Link to="/">Corporate Information</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Speed Test</Link>
            </li>
            <li>
              <Link to="/">Legal Notices</Link>
            </li>
            <li>
              <Link to="/">Netflix Originals</Link>
            </li>
          </ul>
        </div>
      </footer>
      <AuthPopup userEmail={userEmail} isRegister={isRegister} />
    </>
  );
}

export default HomePage;
