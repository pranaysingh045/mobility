import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';



const ComponetDetailForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    componentName: '',
    price: '',
    repair_cost: '',
    component_add_date: '',
    componentUpdateDate: '',
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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}components`, {
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
        componentName: '',
        price: '',
        repair_cost: '',
        component_add_date: '',
        componentUpdateDate: '',
      });
      alert('Component registered successfully!');
      navigate('/component-details')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
    return (
      <>
      <div className='row'>
        <div style={{margin:'0 auto', maxWidth:'600px'}}>
        <div className="col-12 mb-4" >
                <h2>Register Component</h2>
        </div>

        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="componentName" className="form-label">
                Component Name
              </label>
              <input
                type="text"
                className="form-control"
                id="componentName"
                name="componentName"
                value={formData.componentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                />
            </div>
            <div className="mb-3">
              <label htmlFor="repair_cost" className="form-label">
                Repair Cost
              </label>
                <input
                    type="text"
                    className="form-control"
                    id="repair_cost"
                    name="repair_cost"
                    value={formData.repair_cost}
                    onChange={handleChange}
                    required
                  />
            </div>
            <div className="mb-3">
              <label htmlFor="component_add_date" className="form-label">
                Component Add Date
              </label>
                <input
                    type="date"
                    className="form-control"
                    id="component_add_date"
                    name="component_add_date"
                    value={formData.component_add_date}
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

export default ComponetDetailForm
