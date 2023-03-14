import mergeNames from '../mergeNames';

const WhiteBox = ({ children, heading, classnames = '' }) => {
  return (
    <div className={mergeNames('p-6 bg-white rounded-md w-full', classnames)}>
      <p className="grid text-xl font-bold col-span-full">{heading}</p>
      <div className="w-full bg-gray-200 h-[1px] col-span-full rounded-full" />
      {children}
    </div>
  );
};

export default WhiteBox;
