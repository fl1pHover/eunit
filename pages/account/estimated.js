import EstimatedCard, {
  EstimateButton,
} from "@/components/estimator/EstimatedCard";
import urls from "@/constants/api";
import axios from "axios";
import { getCookie } from "cookies-next";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Estimated = () => {
  const token = getCookie("token");
  const [estimate, setEstimate] = useState([]);
  const getEstimate = async () => {
    await axios
      .get(`${urls["test"]}/estimate`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Headers": "*",
        },
      })
      .then((d) => setEstimate(d.data));
  };
  useEffect(() => {
    if (token) getEstimate();
  }, [token]);

  return (
    <div className="py-5">
      <div className="flex justify-end w-full">
        {/* Таны үнэлгээ */}

        <EstimateButton label={true} />
      </div>
      <div className="grid grid-cols-1 gap-3 my-3 xl:grid-cols-2 4xl:grid-cols-3 w-100">
        {estimate &&
          estimate.map((est, i) => {
            return <EstimatedCard est={est} key={i} />;
          })}
      </div>
    </div>
  );
};

export default Estimated;
