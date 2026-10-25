const express = require("express");
const https = require("https");
const axios = require("axios");
const FormData = require("form-data");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function sendWeatherError(res, statusCode, message) {
  if (res.headersSent || res.writableEnded) return;

  res.status(statusCode).type("html").send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Weather unavailable</title></head>
<body>
  <h1>Weather unavailable</h1>
  <p>${escapeHtml(message)}</p>
  <a href="/">Back to home</a>
</body>
</html>`);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/", (req, res) => {
  const cityName =
    typeof req.body?.cityName === "string" ? req.body.cityName.trim() : "";
  if (!cityName) {
    return sendWeatherError(res, 400, "Enter a city name and try again.");
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return sendWeatherError(
      res,
      503,
      "The weather service is not configured. Set OPENWEATHER_API_KEY and try again."
    );
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", cityName);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");

  const request = https.get(url, (apiResponse) => {
    const chunks = [];
    apiResponse.on("data", (chunk) => chunks.push(chunk));
    apiResponse.on("error", () => {
      sendWeatherError(res, 502, "The weather service response could not be read.");
    });
    apiResponse.on("end", () => {
      let weather;
      try {
        weather = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        return sendWeatherError(
          res,
          502,
          "The weather service returned an invalid response."
        );
      }

      if (!weather || typeof weather !== "object") {
        return sendWeatherError(
          res,
          502,
          "The weather service returned an invalid response."
        );
      }

      if (apiResponse.statusCode !== 200) {
        const apiMessage =
          typeof weather.message === "string"
            ? weather.message
            : "Please check the city name and try again.";
        return sendWeatherError(
          res,
          502,
          `The weather service returned an error: ${apiMessage}`
        );
      }

      const temperature = weather.main?.temp;
      const condition = weather.weather?.[0];
      if (
        !Number.isFinite(temperature) ||
        typeof condition?.description !== "string" ||
        typeof condition.icon !== "string" ||
        !/^\d{2}[dn]$/.test(condition.icon)
      ) {
        return sendWeatherError(
          res,
          502,
          "The weather service response was missing weather details."
        );
      }

      const location = [weather.name, weather.sys?.country]
        .filter((part) => typeof part === "string" && part.length > 0)
        .join(", ");
      const description = escapeHtml(condition.description);
      const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;

      res.type("html").send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Weather in ${escapeHtml(location || cityName)}</title></head>
<body>
  <h1>Weather in ${escapeHtml(location || cityName)}</h1>
  <p>Temperature: ${temperature.toFixed(1)} &deg;C</p>
  <p>${description}</p>
  <img src="${iconUrl}" alt="${description}">
  <p><a href="/">Check another city</a></p>
</body>
</html>`);
    });
  });

  request.setTimeout(10000, () => {
    request.destroy(new Error("Weather request timed out."));
  });
  request.on("error", () => {
    sendWeatherError(
      res,
      502,
      "Could not connect to the weather service. Try again later."
    );
  });
});

// https post
app.get("/dictionary", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  const options = {
    method: "POST",
    headers: form_data.getHeaders(),
  };
  var soapRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      response
        .on("data", (data) => {
          var jsonResp = JSON.parse(data);
          console.log(jsonResp);
          res.send("Success");
        })
        .on("error", (e) => {
          res.send("Error ${e.message}");
        });
    } else {
      res.send("Error");
    }
  });
  form_data.pipe(soapRequest);
});

// axios post
app.get("/temp", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  axios
    .post(url, form_data, { headers: form_data.getHeaders() })
    .then((response) => {
      var data = response.data;
      console.log(data);
      if (!data.hasOwnProperty("error")) {
        console.log("no error");
        res.send("Success");
      } else {
        console.log("Fail");
        res.send("Fail");
      }
    })
    .catch((err) => {
      console.log(err.code + ": " + err.message);
      console.log(err.stack);
      res.send("Fail error");
    });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
