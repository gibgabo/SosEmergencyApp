import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <img
            src="/images/png_20220204_191729_0000-removebg-preview-removebg-preview.png" // Use the correct path from the public folder
            alt="Application Logo"
            {...props} // Pass additional props like className
            style={{ width: '224px', height: '224px', ...props.style }} // Adjust size or customize via props
        />
    );
}
