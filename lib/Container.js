import mergeNames from '@/util/mergeNames';

export const Container = ({ children }) => {
  return <div className="xl:px-28 lg:px-20 md:px-20">{children}</div>;
};

export const ContainerX = (props) => {
  return (
    <div
      className={mergeNames(
        'px-4 xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6',
        props?.classname ?? ''
      )}
    >
      {props.children}
    </div>
  );
};

export const ContainerXP = (props) => (
  <div
    className={mergeNames(
      // 'xl:px-28 lg:px-20 md:px-12 sm:px-14 xs:px-6 px-4',
      props?.classname ?? ''
    )}
  >
    {props.children}
  </div>
);

export const NavContainer = (props) => {
  return (
    // <div className="lg:w-[1150px] w-[1000px] mx-auto">
    <div className="px-4 lg:px-12 md:px-2 sm:px-14 xs:px-6">
      {props.children}
    </div>
  );
};
