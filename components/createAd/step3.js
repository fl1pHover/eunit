import Counter from '@/lib/Counter';
import { DateYearSelector } from '@/lib/DateSelector';
import Select from '@/lib/Select';
import { useState } from 'react';
import ButtonSelectItem from './formButtonSelectItem';
import FormLabel from './formLabel';
import FormLine from './formLine';

const Step3 = () => {
  const [roomNumber, setRoomNumber] = useState(false);
  const [bedRoomNumber, setBedRoomNumber] = useState(false);
  const [bathroomNumber, setBathroomNumber] = useState(false);
  const [usedYear, setUsedYear] = useState(false);
  const [building, setBuilding] = useState({ allFloor: false, floor: false });

  return (
    <div className="w-full">
      <Row>
        <Col>
          <FormLabel title="Өрөөний тоо" />
          {/* <div className="flex items-center justify-center w-full"> */}
          <Counter
            limit={5}
            maxValue="5+"
            setValue={(val) => setRoomNumber(val)}
          />
        </Col>
        <Col>
          <FormLabel title="Мастер унтлагын өрөөний тоо" />
          <div className="flex flex-row justify-center gap-4">
            {['Байхгүй', '1', '2', '2+'].map((text, id) => {
              const isSelected = text === bedRoomNumber;
              return (
                <ButtonSelectItem
                  text={text}
                  key={id}
                  isSelected={isSelected}
                  onClick={() => setBedRoomNumber(text)}
                />
              );
            })}
          </div>
        </Col>
      </Row>
      <FormLine />

      <Row>
        <Col>
          <FormLabel title="Угаалгын өрөөний тоо" />
          {/* <div className="flex flex-row justify-center gap-4">
            {["1", "2", "3+"].map((text, id) => {
              const isSelected = text === bathroomNumber;
              return (
                <ButtonSelectItem
                  key={id}
                  text={text}
                  isSelected={isSelected}
                  onClick={() => setBathroomNumber(text)}
                />
              );
            })}
          </div> */}
          <Counter
            limit={3}
            maxValue="3+"
            setValue={(val) => setRoomNumber(val)}
          />
        </Col>
        <Col>
          <FormLabel title="Ашиглалтанд орсон он" />
          {/* <Input /> */}
          <DateYearSelector
            defValue={usedYear}
            placeholder="Ашиглалтанд орсон он"
            onSelect={(num) => setUsedYear(num)}
          />
        </Col>
      </Row>
      <FormLine />
      <Row>
        <Col>
          <FormLabel title="Барилгын давхар" />
          <Select
            data={Array(30).fill()}
            label={
              (building?.allFloor && `${building?.allFloor} давхар`) ||
              'Барилгын давхар'
            }
            Item={({ data, onClick, id, ...props }) => {
              return (
                <button
                  {...props}
                  onClick={() => {
                    onClick();
                    setBuilding((prev) => ({ ...prev, allFloor: id + 1 }));
                  }}
                >
                  {id + 1}
                  {props.children}
                </button>
              );
            }}
          />
        </Col>
        <Col>
          <FormLabel title="Хэдэн давхар" />
          <Select
            data={Array(30).fill()}
            label={
              (building?.floor && `${building?.floor} давхар`) || 'Хэдэн давхар'
            }
            Item={({ data, onClick, id, ...props }) => {
              return (
                <button
                  {...props}
                  onClick={() => {
                    onClick();
                    setBuilding((prev) => ({ ...prev, floor: id + 1 }));
                  }}
                >
                  {id + 1} давхар
                  {props.children}
                </button>
              );
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

const Row = (props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 my-8 md:grid-cols-2">
      {props.children}
    </div>
  );
};

const Col = (props) => (
  <div className="flex flex-col items-center">{props.children}</div>
);

export default Step3;
