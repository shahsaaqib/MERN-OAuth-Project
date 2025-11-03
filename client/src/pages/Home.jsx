import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function Home() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [top, setTop] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/api/search`, { term: search }, { withCredentials: true });
      setImages(res.data.results);
      setMessage(`You searched for "${search}" — ${res.data.results.length} results.`);
      setSearch("");
      fetchHistory();
    } catch (err) {
      alert("Login first to search images.");
    }
  };

  const toggleSelect = (url) => {
    const copy = new Set(selected);
    if (copy.has(url)) copy.delete(url);
    else copy.add(url);
    setSelected(copy);
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/history`, { withCredentials: true });
      setHistory(res.data);
    } catch {}
  };

  const fetchTop = async () => {
    const res = await axios.get(`${API_BASE}/api/top-searches`);
    setTop(res.data);
  };

  useEffect(() => {
    fetchTop();
    fetchHistory();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Image Search App</h1>
        <div className="auth-buttons">
          <a href={`${API_BASE}/auth/google`}><button>Login with Google</button></a>
          <a href={`${API_BASE}/auth/github`}><button>Login with GitHub</button></a>
          <a href={`${API_BASE}/auth/facebook`}><button>Login with Facebook</button></a>
        </div>
        <p className="banner">��� Top searches: {top.map(t => t._id).join(", ")}</p>
      </header>

      <form onSubmit={handleSearch}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search images..." />
        <button type="submit">Search</button>
      </form>

      {message && <p className="message">{message}</p>}
      <p className="selected">Selected: {selected.size} images</p>

      <div className="grid">
        {images.map(img => (
          <div key={img.id} className="img-box">
            <img src={img.urls.small} alt={img.alt_description} onClick={() => toggleSelect(img.urls.small)} />
            <input
              type="checkbox"
              checked={selected.has(img.urls.small)}
              onChange={() => toggleSelect(img.urls.small)}
            />
          </div>
        ))}
      </div>

      <aside>
        <h3>Search History</h3>
        <ul>
          {history.map((h, i) => (
            <li key={i}>{h.term} ({new Date(h.createdAt).toLocaleTimeString()})</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
