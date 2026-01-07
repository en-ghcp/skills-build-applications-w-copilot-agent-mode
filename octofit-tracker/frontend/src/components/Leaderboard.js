import React, { useEffect, useState, useRef } from 'react';


const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const url = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
  return url;
};

  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ user: '', points: '' });
  const modalRef = useRef();

  useEffect(() => {
    const url = getApiUrl();
    console.log('[Leaderboard] Fetching from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('[Leaderboard] Fetched data:', results);
        setEntries(results);
      });
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Demo: just log, not actually posting
    console.log('[Leaderboard] Form submitted:', form);
    setShowModal(false);
    setForm({ user: '', points: '' });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">Leaderboard</h2>
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle"></i> Add Entry
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.user}</td>
                  <td>{e.points}</td>
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
                  <h5 className="modal-title">Add Leaderboard Entry</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">User</label>
                      <input type="text" className="form-control" name="user" value={form.user} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Points</label>
                      <input type="number" className="form-control" name="points" value={form.points} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-success">Save</button>
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
