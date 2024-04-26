import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss';

const AlertPopup = ({ text, iconType, title, confirmButtonText }) => {
    useEffect(() => {
        // Show the alert when the component mounts
        Swal.fire({
            title: title,
            text: text,
            icon: iconType,
            confirmButtonText: confirmButtonText
        });
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return null; // Render nothing because this component only handles the alert popup
}

export default AlertPopup;