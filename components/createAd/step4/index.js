import { Committee } from "@/constants/enums";
import Input from "@/lib/Input";
import Select from "@/lib/Select";
import mergeNames from "@/util/mergeNames";
import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import FilterDate, {
  FilterButtonSelector,
  FilterCounter,
  FilterSelect,
  FilterText,
  FilterYear,
} from "../filters";
import ButtonSelectItem from "../formButtonSelectItem";
import FormLabel from "../formLabel";

const Step3 = ({ filter, handle, state, typeId }) => {
  return (
    <div className="grid w-full md:grid-cols-2 ">
      {filter?.values?.map((f, i) => {
        if (
          f.other == true &&
          f.value.find((v) => v.id == "other") == undefined
        )
          f.value.push({ id: "other", value: "Бусад" });
        if (f.types == "date")
          return (
            <FilterDate
              key={i}
              requirement={
                state[f.type] != undefined && state[f.type] ? false : true
              }
              title={f.name}
              name={f.name}
              onSelect={(num) => {
                handle(f.type, num, "", f.index, f.position, f.isSearch);
              }}
            />
          );
        if (f.types == "year")
          return (
            <FilterYear
              key={i}
              title={f.name}
              onChange={(e) => {
                handle(f.type, e, "", f.index, f.position, f.isSearch);
              }}
            />
          );
        if (f.types === "number")
          return (
            <FilterCounter
              key={i}
              requirement={
                state[f.type] != "" && state[f.type] != undefined ? false : true
              }
              title={f.name}
              limit={f.value[f.value.length - 2].value}
              maxValue={f.value[f.value.length - 1].value}
              setValue={(val) => {
                handle(f.type, val, "", f.index, f.position, f.isSearch);
              }}
            />
          );
        if (f.types == "text")
          return (
            <FilterText
              key={i}
              title={f.name}
              ph={f.name}
              value={state[f.type]}
              onChange={(e) => {
                e.persist();
                handle(
                  f.type,
                  e.target.value,
                  "",
                  f.index,
                  f.position,
                  f.isSearch
                );
              }}
            />
          );
        if (f.types === "radio")
          return (
            <FilterButtonSelector
              key={i}
              title={f.name}
              data={f.value}
              selected={state[f.type]}
              Item={({ text, onClick, id, isSelected, ...props }) => {
                return (
                  <ButtonSelectItem
                    text={text}
                    key={id}
                    isSelected={isSelected}
                    {...props}
                    onClick={() => {
                      handle(f.type, text, "", f.index, f.position, f.isSearch);
                      onClick();
                    }}
                  >
                    {text}
                    {props.children}
                  </ButtonSelectItem>
                );
              }}
            />
          );

        if (f.type == "committee") {
          return (
            typeId && (
              <FilterSelect
                key={i}
                label={state[f.type] ?? f.name}
                title={f.name}
                data={
                  typeId[f.parentId] != "country"
                    ? Committee
                    : f.value.filter((v) => v.parentId == typeId[v.parent])
                }
                requirement={
                  state[f.type] != undefined && state[f.type] != ""
                    ? false
                    : true
                }
                Item={({ data, onClick, id, ...props }) => {
                  return (
                    <button
                      {...props}
                      onClick={(e) => {
                        e.persist();
                        handle(
                          f.type,
                          data,
                          "",
                          f.index,
                          f.position,
                          f.isSearch
                        );

                        onClick();
                      }}
                    >
                      {data}
                      {props.children}
                    </button>
                  );
                }}
              />
            )
          );
        }
        if (f.types == "dropdown")
          if (f.parentId == null) {
            return (
              <FilterSelect
                key={i}
                requirement={
                  state[f.type] != undefined && state[f.type] != ""
                    ? false
                    : true
                }
                title={f.name}
                data={f.value}
                label={state[f.type] ?? f.name}
                Item={({ data, onClick, id, ...props }) => {
                  return (
                    <button
                      {...props}
                      onClick={(e) => {
                        e.persist();
                        handle(
                          f.type,
                          data,
                          id,
                          f.index,
                          f.position,
                          f.isSearch
                        );
                        onClick();
                      }}
                    >
                      {data}
                      {props.children}
                    </button>
                  );
                }}
              />
            );
          } else {
            return (
              typeId && (
                <ItemContainer
                  key={i}
                  className={"flex flex-col items-center justify-center"}
                >
                  <FormLabel title={f.name} />
                  <Select
                    width="long"
                    requirement={
                      state[f.type] != undefined && state[f.type] != ""
                        ? false
                        : true
                    }
                    data={
                      f.value.filter(
                        (v) =>
                          (f.parentId == v.parent &&
                            typeId[f.parentId] == v.parentId) ||
                          v.id == "other"
                      ).length > 0
                        ? f.value.filter(
                            (v) =>
                              (f.parentId == v.parent &&
                                typeId[f.parentId] == v.parentId) ||
                              v.id == "other"
                          )
                        : filter.values
                            .filter((fil) => fil.type == f.parentId)[0]
                            .value.filter(
                              (v) =>
                                v.id == "B2" ||
                                v.id == "B1" ||
                                parseInt(typeId[f.parentId]) >= parseInt(v.id)
                            )
                    }
                    label={state[f.type] ?? f.name}
                    Item={({ data, onClick, id, ...props }) => {
                      return (
                        <button
                          {...props}
                          onClick={(e) => {
                            e.persist();
                            handle(
                              f.type,
                              data,
                              id,
                              f.index,
                              f.position,
                              f.isSearch
                            );
                            onClick();
                          }}
                        >
                          {data}
                          {props.children}
                        </button>
                      );
                    }}
                  />
                  {typeId[f.type] == "other" ? (
                    <Fragment>
                      <Box h={4} />
                      <Input
                        ph={state[f.type]}
                        onChange={(e) => {
                          handle(
                            f.type,
                            e.target.value,
                            "",
                            f.index,
                            f.position,
                            f.isSearch
                          );
                        }}
                        value={state[f.type] != "Бусад" ? state[f.type] : ""}
                      />
                    </Fragment>
                  ) : (
                    <Box />
                  )}
                </ItemContainer>
              )
            );
          }
      })}
    </div>
  );
};
// 620
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

export const ItemContainer = ({ children, className }) => (
  <div className={mergeNames("mb-4 lg:mb-10", className)}>{children}</div>
);

export default Step3;
