import React from "react";

interface ConnectingBannerProps {}

const ConnectingBanner: React.FC<ConnectingBannerProps> = () => {
  return (
    <div className="m-5 p-5 text-center">
      <h2>Trying to Connect...</h2>
    </div>
  );
};

export default ConnectingBanner;
