import { useState } from 'react';
import '../styles/custom-admin.css';
import { LogIn, Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import logo from 'figma:asset/6705fbbec794189a9f9b05c8b8f04e8469de538b.png';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(username, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password');
    }
    setIsLoading(false);
  };

  const handleQuickLogin = async () => {
    setUsername('admin');
    setPassword('password123');
    setError('');
    setIsLoading(true);

    const success = await login('admin', 'password123');
    if (success) {
      onLoginSuccess();
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <img src={logo} alt="Guntur Bank Logo" className="h-14 w-14 object-contain" />
          </div>
          <h1 className="text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Guntur Co-operative Urban Bank</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-xl border-gray-200">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0099ff]/10 rounded-full mb-3">
              <LogIn className="w-4 h-4 text-[#0099ff]" />
              <span className="text-sm text-[#0099ff]">Secure Login</span>
            </div>
            <h2 className="text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 text-sm mt-1">Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-gray-700 mb-2 block">
                Username
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-11"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#0099ff] hover:bg-[#0077cc] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </span>
              )}
            </Button>
          </form>

          {/* Quick Login - Demo Only */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={handleQuickLogin}
              variant="outline"
              className="w-full h-10 border-[#0099ff]/30 text-[#0099ff] hover:bg-[#0099ff]/5 hover:border-[#0099ff]"
            >
              <Zap className="h-4 w-4 mr-2" />
              Quick Login (Demo)
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Demo credentials auto-loaded for quick access
            </p>
          </div>
        </Card>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Protected admin area • Demo Version
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Username: admin • Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}
