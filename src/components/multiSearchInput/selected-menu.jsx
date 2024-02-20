import React from "react";
import { IoMdClose } from "react-icons/io";

const SelectedMenu = ({ image, name, onClick }) => {
  return (
    <div className="selected_menu" onClick={onClick}>
      <img src={image} alt={name} />
      <span>{name}</span>
      <IoMdClose fontSize={20} />
    </div>
  );
};

export default SelectedMenu;
