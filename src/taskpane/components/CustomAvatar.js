import React from "react";

const CustomAvatar = ({ imageUrl, name }) => {
  const renderAvatarContent = () => {
    if (imageUrl) {
      return <img src={imageUrl} alt="Avatar" className="avatar-image" />;
    } else {
      // Generate initials from the name
      //   const initials = name
      //     .split(" ")
      //     .map((part) => part.charAt(0))
      //     .join("")
      //     .toUpperCase();
      let initials = name ? name?.substring(0, 2).toUpperCase() : "";

      return <span className="avatar-initials">{initials}</span>;
    }
  };

  return <div className="avatar">{renderAvatarContent()}</div>;
};

export default CustomAvatar;
