import Tip from '@/lib/Tip';
import Link from 'next/link';

const ItemContainer = ({
  Icon = () => <></>,
  text = '',
  lbl,
  name,
  href = false,
  value,
  id,
}) => {
  return (
    <Tip lbl={lbl}>
      <div className="flex flex-col items-center gap-1 text-mainBlossom">
        <Icon className="" />
        <div className="flex items-center gap-2">
          <p className="md:text-sm text-[14px]">{name}: </p>
          {href ? (
            <Link
              href={{
                pathname: `/category/filter/${id}`,
                query: { num: 0, value: value },
              }}
            >
              <p className="md:text-sm text-[14px] cursor-pointer">{text}</p>
            </Link>
          ) : (
            <p className="md:text-sm text-[14px]">{text}</p>
          )}
        </div>
      </div>
    </Tip>
  );
};

export default ItemContainer;
