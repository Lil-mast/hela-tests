import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  discount?: string;
  originalPrice?: string;
  salePrice?: string;
  url: string;
}

const ExplorePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'HP Laptop - Perfect for Your Goal!',
      description: '15% off select HP models. Perfect for students and professionals. Matches your laptop savings goal.',
      imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      discount: '15% OFF',
      originalPrice: 'Ksh 85,000',
      salePrice: 'Ksh 72,250',
      url: 'https://jumia.co.ke',
    },
    {
      id: '2',
      title: 'Safaricom Data Bundle',
      description: '20GB for 30 days at great value. Perfect for your monthly data needs without overspending.',
      imageUrl: 'https://images.pexels.com/photos/48605/pexels-photo-48605.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Telecommunications',
      salePrice: 'Ksh 1,000',
      url: 'https://safaricom.co.ke',
    },
    {
      id: '3',
      title: 'Energy-Saving Refrigerator',
      description: 'Hotpoint energy-efficient model on offer. Save on electricity bills while keeping food fresh.',
      imageUrl: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Appliances',
      discount: '20% OFF',
      originalPrice: 'Ksh 45,000',
      salePrice: 'Ksh 36,000',
      url: 'https://jumia.co.ke',
    },
    {
      id: '4',
      title: 'Cooking Gas - Bulk Discount',
      description: 'Buy 13kg cooking gas at wholesale prices. Perfect for families looking to save on cooking costs.',
      imageUrl: 'https://images.pexels.com/photos/6419732/pexels-photo-6419732.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Home & Kitchen',
      discount: '10% OFF',
      salePrice: 'Ksh 2,700',
      url: 'https://jumia.co.ke',
    },
    {
      id: '5',
      title: 'Equity Bank Savings Account',
      description: 'High-interest savings account with no monthly fees. Perfect for your emergency fund goal.',
      imageUrl: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Financial Services',
      salePrice: '7% Interest',
      url: 'https://equitybank.co.ke',
    },
    {
      id: '6',
      title: 'Naivas Grocery Bundle',
      description: 'Weekly grocery essentials at discounted prices. Save on your monthly food budget.',
      imageUrl: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Groceries',
      discount: '15% OFF',
      salePrice: 'Ksh 3,500',
      url: 'https://naivas.co.ke',
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout 
      title="Smart Recommendations"
      subtitle="Curated deals and offers based on your goals and spending habits"
    >
      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              {item.discount && (
                <div className="absolute top-3 left-3 bg-error-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {item.discount}
                </div>
              )}
              <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                {item.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {item.originalPrice}
                    </span>
                  )}
                  <span className="text-lg font-bold text-gray-900">
                    {item.salePrice}
                  </span>
                </div>
              </div>
              
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                View Deal
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Note */}
      <div className="mt-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            More recommendations coming soon!
          </h3>
          <p className="text-gray-600">
            We're working with more local businesses to bring you the best deals that match your financial goals.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExplorePage;