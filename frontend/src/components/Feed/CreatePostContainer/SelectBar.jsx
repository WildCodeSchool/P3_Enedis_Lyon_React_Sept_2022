import React from "react";
import groupe from "../../../assets/groupe.svg";

function SelectBar({ showCategories, setShowCategories }) {
  return (
    <div>
      <button
        className="flex flex-col items-center justify-center cursor-pointer pl-7"
        type="button"
        onClick={() => setShowCategories(!showCategories)}
      >
        <img className="w-7 h-7 md:w-9 md:h-9" src={groupe} alt="Group" />
        <h3 className="text-md font-light text-primary md:text-lg">
          Catégorie
        </h3>
      </button>
    </div>
  );
}

export default SelectBar;
