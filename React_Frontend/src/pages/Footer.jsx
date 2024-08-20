import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer>
        <div className="footer">
        <p>&copy; {currentYear} Jose Dino Abaya. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  
export default Footer;