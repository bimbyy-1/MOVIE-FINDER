import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setError('Nama pengguna tidak boleh kosong');
      return;
    }
    onLogin(username.trim());
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>
          Ciné<span className="accent">bi</span>
        </h1>
        <p className="login-sub">Masuk untuk mulai mencari film favoritmu</p>

        <label htmlFor="username">Nama Pengguna</label>
        <input
          id="username"
          type="text"
          placeholder="Masukkan Nama Pengguna"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && <p className="status-text error">{error}</p>}

        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}

export default Login;
