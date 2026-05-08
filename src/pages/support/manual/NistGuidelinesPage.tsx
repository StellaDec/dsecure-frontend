import React from "react";
import { Navigate } from "react-router-dom";

const NistGuidelinesPage: React.FC = () => {
  return <Navigate to="/compliance/nist-800-88" replace />;
};

export default NistGuidelinesPage;
