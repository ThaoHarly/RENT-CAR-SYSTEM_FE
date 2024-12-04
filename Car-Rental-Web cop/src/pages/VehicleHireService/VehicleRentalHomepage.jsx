import React, { useState } from 'react';
import styled from 'styled-components';

const PageLayout = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #3498db;
  }
`;

const MainContent = styled.main`
  padding: 30px;
  text-align: center;
  background-color: #f0f8ff;
  color: #333;
  


`;

const UserTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const UserTypeButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#3498db' : '#ecf0f1'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const ServiceCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const ServiceIcon = styled.div`
  font-size: 40px;
  color: #3498db;
  margin-bottom: 15px;
`;

const VehicleRentalHomepage = () => {
  const [userType, setUserType] = useState('individual');

  const services = [
    {
      icon: '👤',
      title: 'User Registration',
      description: 'Quick and easy registration for individuals and businesses'
    },
    {
      icon: '🔒',
      title: 'User Authentication',
      description: 'Secure information and identity verification'
    },
    {
      icon: '🚗',
      title: 'Vehicle Management',
      description: 'Add, edit and track your vehicles'
    },
    {
      icon: '💳',
      title: 'Payment',
      description: 'Safe and flexible payment system'
    }
  ];
 
  return (
    <PageLayout>
      <MainContent>
        <h1>Comprehensive Vehicle Rental Platform</h1>
        <p>Connecting renters and customers safely and easily</p>

        <UserTypeSelector>
          <UserTypeButton 
            active={userType === 'individual'}
            onClick={() => setUserType('individual')}
          >
            Individual
          </UserTypeButton>
          <UserTypeButton 
            active={userType === 'business'}
            onClick={() => setUserType('business')}
          >
            Business
          </UserTypeButton>
        </UserTypeSelector>

        <div style={{
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {userType === 'individual' ? (
            <>
              <h2>For Individuals</h2>
              <p>Allow individuals to register and rent vehicles easily</p>
            </>
          ) : (
            <>
              <h2>For Businesses</h2>
              <p>Manage your fleet, track revenue and handle rental contracts professionally</p>
            </>
          )}
        </div>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </MainContent>
      <div 
        className="relative py-20 px-4"
        style={{
          backgroundColor: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
            <div className="w-24 h-24 bg-blue-500 opacity-20 rounded-full"></div>
          </div>
          <div className="absolute -right-4 top-1/3 transform -translate-y-1/2">
            <div className="w-32 h-32 bg-blue-300 opacity-20 rounded-full"></div>
          </div>
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied users and experience the best car rental service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                Register Now
              </button>
              
            </div>
            <div className="mt-8 flex justify-center gap-8 text-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
      
        </div>
      </div>

    </PageLayout>
  );
};

export default VehicleRentalHomepage;