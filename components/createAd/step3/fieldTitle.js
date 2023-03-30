import mergeNames from '@/util/mergeNames';
import { AtomLabel } from './atom';

const FieldTitle = ({ setGeneralData = () => {}, generalData }) => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex items-center justify-between w-full">
        <AtomLabel>Зарын гарчиг</AtomLabel>
        <p className="font-semibold">{generalData.title.length ?? 0}/100</p>
      </div>

      <input
        value={generalData.title || ''}
        onChange={(e) => {
          setGeneralData((prev) => ({ ...prev, title: e.target.value }));
        }}
        maxLength="100"
        placeholder="Гарчиг"
        className={mergeNames(
          generalData.title.length > 0
            ? 'border-blue-400/70 ring-blue-400 invalid:border-blue-400 outline-blue-400 '
            : 'border-red-400 ring-red-400 invalid:border-red-400 outline-red-400',
          'w-full px-4 py-2 border-2 rounded-full '
        )}
      />
    </div>
  );
};

export default FieldTitle;
