export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface EPass {
  id: string;
  userId: string;
  categoryId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  destination: string;
  purpose: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  approvedBy?: string;
  appliedAt: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  admin: Admin | null;
  userType: 'user' | 'admin' | null;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalUsers: number;
  activeCategories: number;
}