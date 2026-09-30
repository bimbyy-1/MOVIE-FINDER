function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <h1>
        Ciné<span className="accent">bi</span>
      </h1>

      {user && (
        <div className="navbar-user">
          <span className="user-info">
            <i className="bi bi-person-circle"></i> {user}
          </span>
          <button onClick={onLogout}>
            <i className="bi bi-box-arrow-right"></i> Keluar
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
