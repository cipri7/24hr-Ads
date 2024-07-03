import React from 'react';

const ImageDisplay = ({ imageUrl, link }) => {
    return (
        <div className="container">
            {imageUrl ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="photo-link">
                    <div className="background-img" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                </a>
            ) : (
                <div className="placeholder">
                    <p>No photo currently displayed</p>
                </div>
            )}
        </div>
    );
};

export default ImageDisplay;
