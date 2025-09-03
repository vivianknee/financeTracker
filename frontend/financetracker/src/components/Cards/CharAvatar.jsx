import React from 'react';
import { getInitials } from "../../utils/helper";

const CharAvatar = ({fullName, width, height, style}) => {
    console.log("CharAvatar received fullName:", fullName);
    const initials = getInitials(fullName || "");
    console.log("Generated initials:", initials);
    
    return (
        <div className={`${width || 'w-12'} ${height || 'h-12'} ${
              style || ''
          } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
        >
          {initials}
        </div>
    );
};

export default CharAvatar