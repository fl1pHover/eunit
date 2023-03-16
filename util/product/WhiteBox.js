import mergeNames from '../mergeNames';

const WhiteBox = ({ children, heading, classnames = '' }) => {
  return (
    <div className={mergeNames('p-6 bg-white rounded-md w-full')}>
      <p className="grid text-xl font-bold col-span-full">{heading}</p>
      <div className="w-full bg-gray-200 h-[1px] my-3 col-span-full rounded-full" />
      <div className={mergeNames(classnames)}>{children}</div>
    </div>
  );
};

export default WhiteBox;
