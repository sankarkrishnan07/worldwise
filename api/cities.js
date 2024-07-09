import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data", "cities.json");

export default function handler(req, res) {
  const method = req.method;
  const { id } = req.query;

  // Read the JSON file
  const readJsonFile = () => {
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
  };

  // Write to the JSON file
  const writeJsonFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  };

  try {
    let jsonData = readJsonFile();

    switch (method) {
      case "GET":
        if (id) {
          // Retrieve a single city by ID
          const city = jsonData.cities.find((city) => city.id === id);
          if (city) {
            res.status(200).json(city);
          } else {
            res.status(404).json({ error: "City not found" });
          }
        } else {
          // Retrieve all cities
          res.status(200).json(jsonData);
        }
        break;
      case "POST":
        // Create a new city
        const newCity = req.body;
        jsonData.cities.push(newCity);
        writeJsonFile(jsonData);
        res.status(201).json(newCity);
        break;
      case "DELETE":
        if (id) {
          // Delete a city by ID
          const cityIndex = jsonData.cities.findIndex((city) => city.id === id);
          if (cityIndex === -1) {
            res.status(404).json({ error: "City not found" });
          } else {
            jsonData.cities.splice(cityIndex, 1);
            writeJsonFile(jsonData);
            res.status(200).json({ message: "City deleted successfully" });
          }
        } else {
          res.status(400).json({ error: "City ID is required" });
        }
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
