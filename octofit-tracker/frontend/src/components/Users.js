import React, { useEffect, useState, useRef } from 'react';


const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const url = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
  return url;
};

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: '', email: '' });
  const modalRef = useRef();

  useEffect(() => {
    const url = getApiUrl();
    console.log('[Users] Fetching from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('[Users] Fetched data:', results);
        setUsers(results);
      });
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Demo: just log, not actually posting
    console.log('[Users] Form submitted:', form);
    setShowModal(false);
    setForm({ username: '', email: '' });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">Users</h2>
          <button className="btn btn-warning" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle"></i> Add User
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-warning">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Bootstrap Modal */}
        {showModal && (
          <div className="modal show fade d-block" tabIndex="-1" role="dialog" ref={modalRef}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add User</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input type="text" className="form-control" name="username" value={form.username} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={form.email} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-warning">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
