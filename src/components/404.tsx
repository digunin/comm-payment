import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../utils/values";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => navigate(pathNames.home));
  return <></>;
};

export default NotFound;
