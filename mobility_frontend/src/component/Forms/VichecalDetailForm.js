import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const VichecalDetailForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    vehicle_name: '',
    vehicle_owner: '',
    issue_details: '',
    repair_estimated_time: '',
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}vechical`, {
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
        vehicle_name: '',
        vehicle_owner: '',
        issue_details: '',
        repair_estimated_time: '',
      });
      alert('Vichecal registered successfully!');
      navigate('/vichecal')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
    return (
      <>
      <div className='row'>
        <div style={{margin:'0 auto', maxWidth:'600px'}}>
        <div className="col-12 mb-4" >
                <h2>Vichecal</h2>
        </div>

        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="componentName" className="form-label">
                Vichecal Name
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicle_name"
                name="vehicle_name"
                value={formData.vehicle_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
              Vehicle Owner
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicle_owner"
                name="vehicle_owner"
                value={formData.vehicle_owner}
                onChange={handleChange}
                required
                />
            </div>
            <div className="mb-3">
              <label htmlFor="issue_details" className="form-label">
              Issue Details
              </label>
                <input
                    type="text"
                    className="form-control"
                    id="issue_details"
                    name="issue_details"
                    value={formData.issue_details}
                    onChange={handleChange}
                    required
                  />
            </div>
            <div className="mb-3">
              <label htmlFor="repair_estimated_time" className="form-label">
                Reparing Estimated Time
              </label>
                <input
                    type="date"
                    className="form-control"
                    id="repair_estimated_time"
                    name="repair_estimated_time"
                    value={formData.repair_estimated_time}
                    onChange={handleChange}
                  />
            </div>
            <div className="mb-3">
              <label htmlFor="component-update-date" className="form-label">
                Component Update Date
              </label>
              <input
                  type="date"
                  className="form-control"
                  id="componentUpdateDate"
                  name="componentUpdateDate"
                  value={formData.componentUpdateDate}
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

export default VichecalDetailForm;

