import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const BottomNavBar = () => (
  <div className="bt-nav-bar-bg-container">
    <div className="bt-container">
      <div className="bt-nav-logo-container">
        <FaGoogle />
        <FaTwitter />
        <FaInstagram />
        <FaYoutube />
        {/* <img
          src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686459750/google_vynz4q.png"
          alt="logo"
          className="social-media-logo"
        /> */}
        {/* <img
          src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686459750/twitter_wmbmha.png"
          alt="logo"
          className="social-media-logo"
        />
        <img
          src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686459750/instagram_qcif6r.png"
          alt="logo"
          className="social-media-logo"
        />
        <img
          src="https://res.cloudinary.com/dlafvsqxz/image/upload/v1686459749/youtube_xxyhco.png"
          alt="logo"
          className="social-media-logo"
        /> */}
      </div>
      <p className="contact-us-text">Contact us</p>
    </div>
  </div>
)

export default BottomNavBar
