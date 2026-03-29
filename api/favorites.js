export default async function handler(req, res) {
  const username = "aylinmarie";
  const url = `https://api.ravelry.com/people/${username}/favorites/list.json`;

  const response = await fetch(url, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.VITE_RAVELRY_USERNAME_KEY}:${process.env.VITE_RAVELRY_PASSWORD_KEY}`
        ).toString("base64"),
    },
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: "Ravelry API error" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
