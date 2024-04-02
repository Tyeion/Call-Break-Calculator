import React from 'react';
import './HeaderCard.css';


function HeaderCard({ title }) {
  return (
    <div className="header-card">
      
      <div className="content">
        <h2>{title}</h2>
      </div>
      <div className="semi-circle"></div> {/* Right semi-circle */}
    </div>
  );
}

export default HeaderCard;
