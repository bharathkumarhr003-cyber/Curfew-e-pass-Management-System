import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { EPass } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateMockPasses } from '../data/mockData';
import { Plus, FileText, Clock, CheckCircle, XCircle, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';
import { EPassForm } from './EPassForm';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [passes, setPasses] = useLocalStorage<EPass[]>('user_passes', generateMockPasses);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedPass, setSelectedPass] = useState<EPass | null>(null);

  const userPasses = passes.filter(pass => pass.userId === user?.id || pass.email === user?.email);

  const handleNewApplication = (passData: Omit<EPass, 'id' | 'userId' | 'status' | 'appliedAt' | 'updatedAt'>) => {
    const newPass: EPass = {
      ...passData,
      id: Date.now().toString(),
      userId: user?.id || '',
      status: 'pending',
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPasses([...passes, newPass]);
    setShowApplicationForm(false);
  };

  const getStatusIcon = (status: EPass['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: EPass['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    }
  };

  if (showApplicationForm) {
    return (
      <EPassForm
        onSubmit={handleNewApplication}
        onCancel={() => setShowApplicationForm(false)}
      />
    );
  }

  if (selectedPass) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">E-Pass Details</h2>
              <button
                onClick={() => setSelectedPass(null)}
                className="text-blue-100 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Status Banner */}
            <div className={`rounded-lg border p-4 ${getStatusColor(selectedPass.status)}`}>
              <div className="flex items-center">
                {getStatusIcon(selectedPass.status)}
                <span className="ml-2 font-medium capitalize">{selectedPass.status}</span>
              </div>
              {selectedPass.adminNotes && (
                <p className="mt-2 text-sm">{selectedPass.adminNotes}</p>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{selectedPass.fullName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{selectedPass.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium">{selectedPass.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-600">Address:</span>
                      <p className="ml-0 font-medium">{selectedPass.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Travel Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Destination:</span>
                    <p className="font-medium">{selectedPass.destination}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Purpose:</span>
                    <p className="font-medium">{selectedPass.purpose}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="ml-2 font-medium">
                      {selectedPass.startDate === selectedPass.endDate 
                        ? selectedPass.startDate 
                        : `${selectedPass.startDate} to ${selectedPass.endDate}`
                      }
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="ml-2 font-medium">{selectedPass.startTime} - {selectedPass.endTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Timeline */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Application Timeline</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Applied: {new Date(selectedPass.appliedAt).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Last Updated: {new Date(selectedPass.updatedAt).toLocaleString()}
                </div>
                {selectedPass.approvedBy && (
                  <div className="text-sm text-gray-600">
                    Processed by: {selectedPass.approvedBy}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My E-Pass Applications</h1>
          <p className="text-gray-600 mt-1">Manage your curfew pass applications</p>
        </div>
        <button
          onClick={() => setShowApplicationForm(true)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </button>
      </div>

      {userPasses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
          <p className="text-gray-600 mb-4">Start by submitting your first e-pass application</p>
          <button
            onClick={() => setShowApplicationForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Apply for E-Pass
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {userPasses.map((pass) => (
            <div key={pass.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{pass.destination}</h3>
                      <div className={`ml-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(pass.status)}`}>
                        <div className="flex items-center">
                          {getStatusIcon(pass.status)}
                          <span className="ml-1 capitalize">{pass.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{pass.purpose}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {pass.startDate === pass.endDate ? pass.startDate : `${pass.startDate} - ${pass.endDate}`}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {pass.startTime} - {pass.endTime}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedPass(pass)}
                    className="ml-4 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
                
                {pass.adminNotes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <strong>Admin Notes:</strong> {pass.adminNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};