import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthWrapper() {
  const { user } = useAuthStore();
  const [isLogin, setIsLogin] = React.useState(true);

  if (user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        {isLogin ? <LoginForm /> : <SignUpForm />}

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}