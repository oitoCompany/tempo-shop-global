import React, { Component } from "react";

const NoResults = () => {
  return (
    <div className="products">
      <div className="no-results">
        <img
          src="https://www.tempo.co.il/wp-content/themes/m_soft_drink/images/validation/age_validator_logo.png"
          alt="Empty Tree"
        />
        <h2>לא נמצאו תוצאות לבחירה שהזנת</h2>
        <p>נסה לבחור קטגריה או פריט אחר</p>
      </div>
    </div>
  );
};

export default NoResults;
