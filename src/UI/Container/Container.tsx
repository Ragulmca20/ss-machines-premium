import React from "react";
import "./Container.css"; // Import your CSS file

interface ContainerProps {
  className: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default Container;
