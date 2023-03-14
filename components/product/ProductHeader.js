import { Text } from '@chakra-ui/react';

const ProductHeader = ({ data, price, unitPrice }) => {
  return (
    <>
      
      <div className="text-right">
        <Text className="text-3xl font-semibold text-mainBlue">{price}₮</Text>

        {/* Hervee turees baival ene heregguin bn */}
        <Text className="text-2xl font-semibold ">
          {unitPrice}
          ₮/мкв
        </Text>
      </div>
    </>
  );
};

export default ProductHeader;
