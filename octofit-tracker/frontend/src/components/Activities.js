import React, { useEffect, useState } from 'react';
import { useRef } from 'react';


const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const url = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';
  return url;
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: '', duration: '', user: '' });
  const modalRef = useRef();

  useEffect(() => {
    const url = getApiUrl();
    console.log('[Activities] Fetching from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('[Activities] Fetched data:', results);
        setActivities(results);
      });
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Demo: just log, not actually posting
    console.log('[Activities] Form submitted:', form);
    setShowModal(false);
    setForm({ type: '', duration: '', user: '' });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">Activities</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle"></i> Add Activity
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{a.type}</td>
                  <td>{a.duration}</td>
                  <td>{a.user}</td>
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
                  <h5 className="modal-title">Add Activity</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <input type="text" className="form-control" name="type" value={form.type} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Duration (min)</label>
                      <input type="number" className="form-control" name="duration" value={form.duration} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">User</label>
                      <input type="text" className="form-control" name="user" value={form.user} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
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
