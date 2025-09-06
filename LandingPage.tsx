import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, Users, ArrowRight, FileText, User, Settings } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type ViewState = 'landing' | 'user-login' | 'admin-login' | 'register';

export const LandingPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  if (currentView === 'user-login') {
    return (
      <LoginForm 
        userType="user" 
        onSwitchToRegister={() => setCurrentView('register')} 
      />
    );
  }

  if (currentView === 'admin-login') {
    return <LoginForm userType="admin" />;
  }

  if (currentView === 'register') {
    return (
      <RegisterForm 
        onSwitchToLogin={() => setCurrentView('user-login')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-blue-100 rounded-full">
                <Shield className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Curfew E-Pass
              <span className="block text-blue-600">Management System</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A secure, efficient digital platform for citizens to apply for emergency travel passes 
              during curfew periods, and for authorities to manage and approve applications.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentView('user-login')}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                <User className="h-5 w-5 mr-2" />
                Citizen Portal
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              
              <button
                onClick={() => setCurrentView('admin-login')}
                className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                <Settings className="h-5 w-5 mr-2" />
                Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools needed for efficient curfew pass management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Application</h3>
              <p className="text-gray-600">Simple online forms for citizens to apply for emergency travel passes</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Approval</h3>
              <p className="text-gray-600">Streamlined review process for faster decision making</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-purple-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Status</h3>
              <p className="text-gray-600">Track your application status in real-time with notifications</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-indigo-50 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Control</h3>
              <p className="text-gray-600">Comprehensive dashboard for administrators to manage all applications</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple three-step process to get your emergency travel pass
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Register & Apply</h3>
              <p className="text-gray-600">
                Create an account and fill out the application form with your travel details and emergency reasons
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Review</h3>
              <p className="text-gray-600">
                Authorized personnel review your application and verify the emergency nature of your travel
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Your Pass</h3>
              <p className="text-gray-600">
                Receive instant notification of approval and access your digital pass for emergency travel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Curfew E-Pass Management System</h3>
            <p className="text-gray-400 mb-6">Ensuring public safety through efficient pass management</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentView('user-login')}
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Citizen Login
              </button>
              <button
                onClick={() => setCurrentView('admin-login')}
                className="inline-flex items-center px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Admin Access
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};