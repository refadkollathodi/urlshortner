import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setoriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return alert("Please enter a URL");

    setLoading(true);
    setShortUrl("");
    setoriginalUrl("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/shorten/", {
        original_url: url,
      });

      setShortUrl(res.data.shorturl);
      setoriginalUrl(res.data.original_url);
    } catch (err) {
      console.error(err);
      alert("Error shortening the URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {shortUrl && (
        <p className="result">
          Shortened URL:{" "}
          <a href={originalUrl} target="_blank" rel="noopener noreferrer">
            Click to redirect..
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
