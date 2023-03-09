import { CurrencyInput, FormattedNumberInput } from '@/lib/Input';
import { formatNumber } from '@/util/numberEdit';
import { AtomLabel, AtomPriceText } from './atom';
const FieldPriceArea = ({ setGeneralData = () => {}, generalData = {} }) => {
  return (
    <>
      <div>
        <AtomLabel>Үнэ:</AtomLabel>
        <CurrencyInput
          placeholder="Үнэ"
          value={generalData?.price || 0}
          onChange={(val) =>
            setGeneralData((prev) => ({ ...prev, price: val }))
          }
        />
      </div>
      {/* <p className="text-sm indent-2">Тоон утга оруулна уу.</p> */}

      <div>
        <AtomLabel>Талбай:</AtomLabel>
        <FormattedNumberInput
          placeholder="Талбай"
          value={generalData?.area || 0}
          suffix="м.кв"
          onChange={(val) =>
            setGeneralData((prev) => {
              const unitPrice = Number.parseFloat(prev.price / val).toFixed(2);
              return {
                ...prev,
                area: val,
                unitPrice: unitPrice,
              };
            })
          }
        />
      </div>

      <div>
        <AtomLabel>Нэгж талбайн үнэ:</AtomLabel>
        <div className="flex items-center gap-1 indent-2">
          {generalData?.price && generalData?.area ? (
            <AtomPriceText>
              {formatNumber(generalData?.price / generalData?.area) || '-'}
            </AtomPriceText>
          ) : (
            <AtomPriceText>0</AtomPriceText>
          )}
          <p className="font-semibold">₮ (м.кв)</p>
        </div>
      </div>
    </>
  );
};

export default FieldPriceArea;
