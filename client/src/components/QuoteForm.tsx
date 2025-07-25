import React, { useState } from 'react';
import './QuoteForm.css';

interface QuoteFormData {
  insuranceType: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  homeValue?: string;
  homeType?: string;
  coverageAmount?: string;
}

const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    insuranceType: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Quote request submitted successfully! We will contact you soon.');
        setFormData({
          insuranceType: '',
          zipCode: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
        });
        setStep(1);
      } else {
        alert('Error submitting quote request. Please try again.');
      }
    } catch (error) {
      alert('Error submitting quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="quote-form-section" id="quote">
      <div className="container">
        <div className="quote-form-header">
          <h2>Get Your Free Quote Today</h2>
          <p>Start protecting what matters most in just a few minutes</p>
        </div>
        
        <div className="quote-form-container">
          <div className="progress-bar">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          <form onSubmit={handleSubmit} className="quote-form">
            {step === 1 && (
              <div className="form-step">
                <h3>Insurance Type & Location</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="insuranceType">Type of Insurance *</label>
                    <select
                      id="insuranceType"
                      name="insuranceType"
                      value={formData.insuranceType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Insurance Type</option>
                      <option value="auto">Auto Insurance</option>
                      <option value="home">Home Insurance</option>
                      <option value="life">Life Insurance</option>
                      <option value="business">Business Insurance</option>
                      <option value="bundle">Auto + Home Bundle</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter your ZIP code"
                      pattern="[0-9]{5}"
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary"
                  disabled={!formData.insuranceType || !formData.zipCode}
                >
                  Next Step
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-buttons">
                  <button type="button" onClick={handlePrevStep} className="btn-secondary">
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary"
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.dateOfBirth}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h3>Coverage Details</h3>
                
                {(formData.insuranceType === 'auto' || formData.insuranceType === 'bundle') && (
                  <div className="coverage-section">
                    <h4>Vehicle Information</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="vehicleYear">Vehicle Year</label>
                        <select
                          id="vehicleYear"
                          name="vehicleYear"
                          value={formData.vehicleYear || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Year</option>
                          {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                            <option key={year} value={year.toString()}>{year}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="vehicleMake">Vehicle Make</label>
                        <input
                          type="text"
                          id="vehicleMake"
                          name="vehicleMake"
                          value={formData.vehicleMake || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., Honda"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="vehicleModel">Vehicle Model</label>
                        <input
                          type="text"
                          id="vehicleModel"
                          name="vehicleModel"
                          value={formData.vehicleModel || ''}
                          onChange={handleInputChange}
                          placeholder="e.g., Civic"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(formData.insuranceType === 'home' || formData.insuranceType === 'bundle') && (
                  <div className="coverage-section">
                    <h4>Home Information</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="homeType">Home Type</label>
                        <select
                          id="homeType"
                          name="homeType"
                          value={formData.homeType || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Home Type</option>
                          <option value="single-family">Single Family Home</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="condo">Condominium</option>
                          <option value="apartment">Apartment</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="homeValue">Estimated Home Value</label>
                        <select
                          id="homeValue"
                          name="homeValue"
                          value={formData.homeValue || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Value Range</option>
                          <option value="under-100k">Under $100,000</option>
                          <option value="100k-200k">$100,000 - $200,000</option>
                          <option value="200k-300k">$200,000 - $300,000</option>
                          <option value="300k-500k">$300,000 - $500,000</option>
                          <option value="500k-750k">$500,000 - $750,000</option>
                          <option value="750k-1m">$750,000 - $1,000,000</option>
                          <option value="over-1m">Over $1,000,000</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {formData.insuranceType === 'life' && (
                  <div className="coverage-section">
                    <h4>Life Insurance Coverage</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="coverageAmount">Desired Coverage Amount</label>
                        <select
                          id="coverageAmount"
                          name="coverageAmount"
                          value={formData.coverageAmount || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Coverage Amount</option>
                          <option value="100k">$100,000</option>
                          <option value="250k">$250,000</option>
                          <option value="500k">$500,000</option>
                          <option value="1m">$1,000,000</option>
                          <option value="2m">$2,000,000</option>
                          <option value="custom">Custom Amount</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-buttons">
                  <button type="button" onClick={handlePrevStep} className="btn-secondary">
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Quote'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
