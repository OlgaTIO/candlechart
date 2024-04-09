import axios from "axios";

export async function getForexBar(
  range,
  interval,
  startTime,
  endTime,
  newStartTime = null,
  newEndTime = null
) {
  const apiKey = "Y4mZBIT8oRS2cfAHJaiLZkSzGARBJBEt";

  if (!range || !startTime || !endTime) {
    throw new Error(
      "Invalid input parameters. Range, start time, and end time are required."
    );
  }
  const updatedStartTime = newStartTime ? newStartTime : startTime;
  const updatedEndTime = newEndTime ? newEndTime : endTime;

  const apiUrl = `https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/${range}/${interval}/${updatedStartTime}/${updatedEndTime}?adjusted=true&apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    console.error("Error:", error.message);

    throw error;
  }
}
