import React, { useEffect, useState, useRef } from 'react';


const getApiUrl = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const url = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';
  return url;
};

  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', duration: '' });
  const modalRef = useRef();

  useEffect(() => {
    const url = getApiUrl();
    console.log('[Workouts] Fetching from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('[Workouts] Fetched data:', results);
        setWorkouts(results);
      });
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Demo: just log, not actually posting
    console.log('[Workouts] Form submitted:', form);
    setShowModal(false);
    setForm({ name: '', type: '', duration: '' });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">Workouts</h2>
          <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle"></i> Add Workout
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((w, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{w.name}</td>
                  <td>{w.type}</td>
                  <td>{w.duration}</td>
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
                  <h5 className="modal-title">Add Workout</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" value={form.name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <input type="text" className="form-control" name="type" value={form.type} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Duration (min)</label>
                      <input type="number" className="form-control" name="duration" value={form.duration} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-secondary">Save</button>
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
