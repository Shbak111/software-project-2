import{ useEffect } from "react";
import RB_MICHELIN_CSV from "../data/RB_MICHELIN_SLCTN_RSTRNT_INFO_20211231.csv";

const CSVSelector = ({ onChange }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(RB_MICHELIN_CSV);
        const text = await response.text();
        const lines = text.split("\n");
        const _data = lines.map((line) => line.split(","));

        onChange(_data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [onChange]);

  return null; 
};

export default CSVSelector;