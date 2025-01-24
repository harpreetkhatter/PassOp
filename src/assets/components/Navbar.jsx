import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white flex justify-around h-16 items-center">
      <div className="logo text-2xl font-bold cursor-pointer">
        <span className="text-green-400 ">&lt;</span>
        <span>
          pass<span className="text-green-400">OP</span>
        </span>
        <span className="text-green-400">&gt;</span>
      </div>
      <div className="git">
        <button className="flex bg-green-600 items-center justify-center rounded-full px-2 py-2 gap-2 hover:ring-[1.2px]  hover:ring-white">
        <span className="text-lg font-semibold">github</span>
          <img src="/icons/git.svg" alt="git" className="invert" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
