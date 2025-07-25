import React from 'react';
import './Products.css';

const Products: React.FC = () => {
  const products = [
    {
      title: 'Auto Insurance',
      description: 'Comprehensive coverage for your vehicle with competitive rates and excellent service.',
      features: ['Collision Coverage', 'Comprehensive Coverage', '24/7 Roadside Assistance', 'Rental Car Coverage'],
      icon: '🚗'
    },
    {
      title: 'Home Insurance',
      description: 'Protect your home and belongings with our comprehensive homeowners insurance.',
      features: ['Dwelling Coverage', 'Personal Property', 'Liability Protection', 'Additional Living Expenses'],
      icon: '🏠'
    },
    {
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future with our flexible life insurance policies.',
      features: ['Term Life Insurance', 'Whole Life Insurance', 'Flexible Premiums', 'Cash Value Growth'],
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Business Insurance',
      description: 'Comprehensive protection for your business operations and assets.',
      features: ['General Liability', 'Property Coverage', 'Workers Compensation', 'Cyber Liability'],
      icon: '🏢'
    }
  ];

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Insurance Products</h2>
          <p>Comprehensive coverage solutions tailored to your needs</p>
        </div>
        
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-icon">{product.icon}</div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <ul className="features-list">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button className="btn-outline">Learn More</button>
            </div>
          ))}
        </div>

        <div className="bundle-offer">
          <div className="bundle-content">
            <h3>Save More with Bundled Coverage</h3>
            <p>Bundle your auto and home insurance to save up to 25% on your premiums</p>
            <button className="btn-primary">Get Bundle Quote</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
