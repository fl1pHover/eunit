import React from "react";

export const Container = () => {
  return <div className="lg:px-14 md:px-10">Container</div>;
};
export const ContainerX = (props) => {
  return (
    <div className="lg:px-14 md:px-10 sm:px-8 xs:px-6 px-4">
      {props.children}
    </div>
  );
};
