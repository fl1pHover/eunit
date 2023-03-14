import { Text } from '@chakra-ui/react';
import currency from 'currency.js';
import Link from 'next/link';

const ProductInfoValue = ({ href, value, id }) => {
  return href ? (
    <Link
      href={{
        pathname: `/category/filter/${id}`,
        query: { num: 0, value: value },
      }}
    >
      <Text
        fontSize={{ base: '13px', xl: '15px' }}
        cursor={'pointer'}
        fontWeight={'bold'}
      >
        {id === 'price' || id === 'unitPrice'
          ? currency(value, { separator: ',', symbol: '₮ ' })
              .format()
              .toString()
          : value}
      </Text>
    </Link>
  ) : (
    <Text fontSize={{ base: '13px', xl: '15px' }} fontWeight={'bold'}>
      {id === 'price' || id === 'unitPrice'
        ? currency(value, { separator: ',', symbol: '₮ ' }).format().toString()
        : value}
    </Text>
  );
};

export default ProductInfoValue;
