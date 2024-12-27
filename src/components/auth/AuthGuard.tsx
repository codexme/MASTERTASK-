import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import AuthForm from './AuthForm';
import LandingPage from '../landing/LandingPage';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuthStore();

  React.useEffect(() => {
    useAuthStore.getState().initAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <>{children}</>;
}