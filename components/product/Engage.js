const Engage = ({ view, date, num }) => {
  return (
    <div className="flex flex-row justify-between lg:flex-col  text-[14px] font-bold">
      <p className="mr-[10px]">
        Зарын огноо: {date}
      </p>
      <p>Зарын дугаар: {num}</p>
    {view}
    </div>
  );
};

export default Engage;
