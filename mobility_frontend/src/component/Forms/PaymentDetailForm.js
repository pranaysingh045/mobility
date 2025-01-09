import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentDetailForm = () => {
  const [data, setData] = useState([])

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    vechical: '',
    payment_method: '',
    total_cost: '',
    payment_issued_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}vechical`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}payment`, {
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
        vechical: '',
        payment_method: '',
        total_cost: '',
        payment_issued_date: '',
      });
      alert('Payment successfull!');
      navigate('/payment')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className='row'>
        <div style={{ margin: '0 auto', maxWidth: '600px' }}>
          <div className="col-12 mb-4" >
            <h2>Payment</h2>
          </div>

          <div className="col-12">
            <form onSubmit={handleSubmit}>
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
                  {data.map((component) => (
                    <option key={component.id} value={component.id}>
                      {component.vehicle_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="payment_method" className="form-label">
                  Payment Method
                </label>
                <select
                  className="form-select"
                  id="payment_method"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Payment Method
                  </option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="net_banking">Net Banking</option>
                  <option value="upi">UPI</option>
                  <option value="wallet">E-Wallet</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="total_cost" className="form-label">
                  Total Cost
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="total_cost"
                  name="total_cost"
                  value={formData.total_cost}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="payment_issued_date" className="form-label">
                  Payment Issued Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="payment_issued_date"
                  name="payment_issued_date"
                  value={formData.payment_issued_date}
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

export default PaymentDetailForm;

