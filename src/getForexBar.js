import axios from "axios";

export async function getForexBar() {
  const apiKey = "Y4mZBIT8oRS2cfAHJaiLZkSzGARBJBEt";
  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/5/minute/2023-03-22/2023-03-23?apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    console.log("Response data:", response);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
