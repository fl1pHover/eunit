import { AtomLabel } from './atom';

const FieldTitle = ({ setGeneralData = () => {}, generalData }) => {
  return (
    <div className="flex flex-col items-start w-full">
      <AtomLabel>Зарын гарчиг</AtomLabel>
      <input
        value={generalData.title || ''}
        onChange={(e) => {
          setGeneralData((prev) => ({ ...prev, title: e.target.value }));
        }}
        maxlength="100"
        placeholder="Гарчиг"
        className="w-full px-4 py-2 border-2 rounded-full border-blue-400/70 ring-blue-400 invalid:border-blue-400 outline-blue-400"
      />
    </div>
  );
};

export default FieldTitle;
