import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const IssueDetailForm = () => {
  const [data, setData] = useState([])
  const [dataVichecal, setDataVichecal] = useState([])

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    component_registration: '',
    vechical: '',
    labour_cost: '',
    created_on: '',
    description: '',
    labour_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Response from server:', result);

      setFormData({
        component_registration: null,
        vechical: null,
        labour_cost: '',
        created_on: '',
        description: '',
        labour_name: ''
      });
      alert('Issue registered successfully!');
      navigate('/issues')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}components`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const fetchDataVichecalData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}vechical`);
      const result = await response.json();
      setDataVichecal(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchDataVichecalData()
  }, [])

  return (
    <>
      <div className='row'>
        <div style={{ margin: '0 auto', maxWidth: '600px' }}>
          <div className="col-12 mb-4" >
            <h2>Issue Detail</h2>
          </div>

          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="component_registration" className="form-label">
                  Components
                </label>
                <select
                  className="form-select"
                  id="component_registration"
                  name="component_registration"
                  value={formData.component_registration}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Component
                  </option>
                  {data.map((component) => (
                    <option key={component.id} value={component.id}>
                      {component.componentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="vechical" className="form-label">
                Vehicle
                </label>
                <select
                  className="form-select"
                  id="vechical"
                  name="vechical"
                  value={formData.vechical}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Vichecal
                  </option>
                  {dataVichecal.map((component) => (
                    <option key={component.id} value={component.id}>
                      {component.vehicle_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="labour_cost" className="form-label">
                  Labour Cost
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="labour_cost"
                  name="labour_cost"
                  value={formData.labour_cost}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="labour_name" className="form-label">
                  Labour Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="labour_name"
                  name="labour_name"
                  value={formData.labour_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="created_on" className="form-label">
                  Created On
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="created_on"
                  name="created_on"
                  value={formData.created_on}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default IssueDetailForm;

