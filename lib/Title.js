import mergeNames from "@/util/mergeNames";

const Title = (props) => {
  return (
    <p
      className={mergeNames(
        "font-semibold pb-2 text-gray-900",
        props?.classname
      )}
    >
      {props.children}
    </p>
  );
};

export default Title;

export const SectionTitle = (props) => {
  return (
    <p
      className={mergeNames(
        "lg:text-4xl md:text-3xl text-2xl text-gray-700 font-bold first-letter:capitalize lowercase",
        props?.classname ?? ""
      )}
    >
      {props.children}
    </p>
  );
};
