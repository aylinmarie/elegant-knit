export default async function handler(req, res) {
  const usernameKey = process.env.VITE_RAVELRY_USERNAME_KEY;
  const passwordKey = process.env.VITE_RAVELRY_PASSWORD_KEY;

  if (!usernameKey || !passwordKey) {
    return res.status(500).json({ error: "Missing Ravelry credentials in environment" });
  }

  const username = "aylinmarie";
  const url = `https://api.ravelry.com/people/${username}/favorites/list.json`;

  const response = await fetch(url, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${usernameKey}:${passwordKey}`).toString("base64"),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    return res.status(response.status).json({ error: "Ravelry API error", detail: body });
  }

  const data = await response.json();
  res.status(200).json(data);
}
