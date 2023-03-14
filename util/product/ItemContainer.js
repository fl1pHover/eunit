import Tip from '@/lib/Tip';

const ItemContainer = ({ Icon = () => <></>, text = '', lbl, name }) => {
  return (
    <Tip lbl={lbl}>
      <div className="flex flex-col items-center gap-1 text-mainBlossom">
        <Icon className="" />
        <div className="flex items-center gap-2">
          <p className="md:text-sm text-[14px]">{name}: </p>
          <p className="md:text-sm text-[14px]">{text}</p>
        </div>
      </div>
    </Tip>
  );
};

export default ItemContainer;
