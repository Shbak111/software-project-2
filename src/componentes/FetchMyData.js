import axios from "axios";

async function FetchMyData() {
  try {
    const response = await axios({
      url: "/api/data",
      method: "GET",
      withCredentials: true,
    });
    const filteredData = response.data;
    const filteredData2 = filteredData.elements[0].elements[1];
    return filteredData2;
  } catch {
    console.error("Error fetching data:");
    return null;
  }
}

export default FetchMyData;
