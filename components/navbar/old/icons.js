import Text from "../../lib/Text";
import mergeNames from "../../util/mergeNames";

const layout = "cursor-pointer flex flex-col items-center";

export const WalletIcon = ({ onClick = () => {} }) => {
  return (
    <button onClick={onClick} className="cursor-pointer animated__wallet">
      <div className="flex flex-row items-center gap-1">
        <div width={"25px"} height="25px" className="animated__icon" />
        <div className="flex flex-col">
          <Text>Хэтэвч</Text>
          <Text>0,000₮</Text>
        </div>
      </div>
    </button>
  );
};

export const EstimateIcon = ({ onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer animated__estimator"
    >
      <div width={"25px"} height="25px" className="animated__icon" />
      <Text>Үнэлгээ</Text>
    </button>
  );
};

export const HeartIcon = ({ word = true, onClick = () => {} }) => {
  return (
    <button onClick={onClick} className={mergeNames("animated__heart", layout)}>
      <div width={"25px"} height="25px" className="animated__icon" />
      {word && <Text>Хүсэл</Text>}
    </button>
  );
};

export const WhiteHeartIcon = ({ word = true, onClick = () => {} }) => {
  return (
    <button onClick={onClick} className={mergeNames("white__animated__heart", layout)}>
      <div width={"25px"} height="25px" className="animated__icon" />
      {word && <Text>Хүсэл</Text>}
    </button>
  );
};

export const UserIcon = ({
  text = "",
  classname = "",
  onClick = () => {},
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={mergeNames(
        "animated__account",
        layout,
        // active ? "" : "",
        classname && classname
      )}
    >
      <div width={"25px"} height="25px" className="animated__icon" />
      <Text>{text}</Text>
    </button>
  );
};