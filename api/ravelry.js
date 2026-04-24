export default async function handler(req, res) {
  const credentials = Buffer.from(
    `${process.env.RAVELRY_USERNAME_KEY}:${process.env.RAVELRY_PASSWORD_KEY}`
  ).toString("base64");

  const response = await fetch(
    "https://api.ravelry.com/people/aylinmarie/favorites/list.json",
    { headers: { Authorization: `Basic ${credentials}` } }
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Ravelry API error" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
