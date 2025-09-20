// Authentication API Service
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    employee_id?: string;
    name?: string;
    role?: string;
  };
  message?: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ResetPasswordRequest {
  employee_id: string;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

class AuthService {
  private getAuthHeaders(token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Mock login for development
  private async mockLogin(credentials: LoginRequest): Promise<LoginResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation for demo purposes
    if (credentials.email === 'admin@kmrl.com' && credentials.password === 'admin123') {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: credentials.email,
          employee_id: 'KMRL001',
          name: 'System Administrator',
          role: 'admin'
        },
        message: 'Mock login successful'
      };
    } else if (credentials.email === 'operator@kmrl.com' && credentials.password === 'operator123') {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '2',
          email: credentials.email,
          employee_id: 'KMRL002',
          name: 'Fleet Operator',
          role: 'operator'
        },
        message: 'Mock login successful'
      };
    } else {
      throw new Error('Invalid credentials. Try admin@kmrl.com / admin123 or operator@kmrl.com / operator123');
    }
  }

  // 1. User Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Development mode: Use mock login if backend is not available
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
      console.warn('Development mode: Using mock login. Set VITE_API_URL to connect to backend.');
      return this.mockLogin(credentials);
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      return this.handleResponse<LoginResponse>(response);
    } catch (error) {
      // If fetch fails (network error), try mock login in development
      if (import.meta.env.DEV) {
        console.warn('Backend unavailable, using mock login:', error);
        return this.mockLogin(credentials);
      }
      throw error;
    }
  }

  // 2. Get Auth Token (Alternative login method)
  async getToken(credentials: TokenRequest): Promise<LoginResponse> {
    // Development mode: Use mock login if backend is not available
    if (import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
      console.warn('Development mode: Using mock token login. Set VITE_API_URL to connect to backend.');
      return this.mockLogin(credentials);
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/token/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      return this.handleResponse<LoginResponse>(response);
    } catch (error) {
      // If fetch fails (network error), try mock login in development
      if (import.meta.env.DEV) {
        console.warn('Backend unavailable, using mock token login:', error);
        return this.mockLogin(credentials);
      }
      throw error;
    }
  }

  // 3. User Logout
  async logout(token: string): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
    });

    return this.handleResponse<ApiResponse>(response);
  }

  // 4. Change Password
  async changePassword(token: string, passwordData: ChangePasswordRequest): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/auth/change-password/`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(passwordData),
    });

    return this.handleResponse<ApiResponse>(response);
  }

  // 5. Request Password Reset
  async requestPasswordReset(resetData: ResetPasswordRequest): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/auth/reset-password-request/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(resetData),
    });

    return this.handleResponse<ApiResponse>(response);
  }

  // Utility method to get stored token
  getStoredToken(): string | null {
    return localStorage.getItem('kmrl-auth-token');
  }

  // Utility method to store token
  storeToken(token: string): void {
    localStorage.setItem('kmrl-auth-token', token);
  }

  // Utility method to remove token
  removeToken(): void {
    localStorage.removeItem('kmrl-auth-token');
  }

  // Utility method to get stored user data
  getStoredUser(): any | null {
    const userData = localStorage.getItem('kmrl-user-data');
    return userData ? JSON.parse(userData) : null;
  }

  // Utility method to store user data
  storeUser(user: any): void {
    localStorage.setItem('kmrl-user-data', JSON.stringify(user));
  }

  // Utility method to remove user data
  removeUser(): void {
    localStorage.removeItem('kmrl-user-data');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    return !!token;
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;

