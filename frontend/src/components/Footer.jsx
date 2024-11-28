import React from 'react';

function Footer() {
  return (
    <footer className="bg-orange-700 text-yellow-100 py-10 flex justify-center items-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="text-lg font-bold">SuryaGhar</div>

        <div className="text-sm">&copy; {new Date().getFullYear()} SuryaGhar. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
