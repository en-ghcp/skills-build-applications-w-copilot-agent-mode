import React, { useEffect, useState, useRef } from 'react';


const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const url = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
  return url;
};

  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', members: '' });
  const modalRef = useRef();

  useEffect(() => {
    const url = getApiUrl();
    console.log('[Teams] Fetching from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('[Teams] Fetched data:', results);
        setTeams(results);
      });
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Demo: just log, not actually posting
    console.log('[Teams] Form submitted:', form);
    setShowModal(false);
    setForm({ name: '', members: '' });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">Teams</h2>
          <button className="btn btn-info" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle"></i> Add Team
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-info">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{t.name}</td>
                  <td>{t.members ? t.members.length : 0}</td>
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
                  <h5 className="modal-title">Add Team</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" value={form.name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Members (comma separated)</label>
                      <input type="text" className="form-control" name="members" value={form.members} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-info">Save</button>
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
