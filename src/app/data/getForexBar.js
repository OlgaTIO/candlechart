import axios from "axios";

export async function getForexBar(range) {
  const apiKey = "Y4mZBIT8oRS2cfAHJaiLZkSzGARBJBEt";

  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/${range}/minute/2023-03-22/2023-03-22?adjusted=true&apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    console.error("Error:", error.message);

    throw error;
  }
}
