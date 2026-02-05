import React, { useState } from 'react';
import { Role, ViewState } from './types';
import { Layout } from './components/Layout';
import { StudentViews } from './views/StudentViews';
import { InstructorViews } from './views/InstructorViews';
import { AdminViews } from './views/AdminViews';
import { Card, Button, Toast } from './components/UIComponents';
import { GraduationCap, BookOpen, ShieldCheck, ArrowLeft, Lock, Mail } from 'lucide-react';
import { APP_NAME } from './constants';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setEmail('');
    setPassword('');
    setCurrentView('dashboard');
  };

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Fake authentication delay
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      setCurrentView(role === 'admin' ? 'analytics' : 'dashboard');
    }, 1000);
  };

  // Role Selection Screen
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/50 rounded-full blur-[100px]" />

        <div className="max-w-4xl w-full z-10 text-center space-y-12">
          <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] pb-2">
              {APP_NAME}
            </h1>
            <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
              Experience the future of education management. Select your portal to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Student Card */}
             <Card 
               onClick={() => setRole('student')}
               className="p-8 hover:ring-2 hover:ring-[#0071E3] transition-all cursor-pointer group animate-in zoom-in-50 duration-300"
             >
               <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0071E3] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                 <GraduationCap size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Student</h3>
               <p className="text-sm text-[#86868B]">Access courses, assessments, and progress tracking.</p>
             </Card>

             {/* Instructor Card */}
             <Card 
               onClick={() => setRole('instructor')}
               className="p-8 hover:ring-2 hover:ring-[#5E5CE6] transition-all cursor-pointer group animate-in zoom-in-50 duration-300"
             >
               <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#5E5CE6] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                 <BookOpen size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Instructor</h3>
               <p className="text-sm text-[#86868B]">Manage content, grade assessments, and communicate.</p>
             </Card>

             {/* Admin Card */}
             <Card 
               onClick={() => setRole('admin')}
               className="p-8 hover:ring-2 hover:ring-[#34C759] transition-all cursor-pointer group animate-in zoom-in-50 duration-300"
             >
               <div className="w-16 h-16 rounded-2xl bg-green-50 text-[#34C759] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                 <ShieldCheck size={32} />
               </div>
               <h3 className="text-xl font-bold mb-2">Admin</h3>
               <p className="text-sm text-[#86868B]">Oversee users, analytics, and coordinate classes.</p>
             </Card>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] p-4">
        <div className="absolute top-8 left-8">
           <Button variant="ghost" onClick={() => setRole(null)} className="gap-2">
             <ArrowLeft size={20} /> Back to Role Selection
           </Button>
        </div>
        
        <Card className="w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 
              ${role === 'student' ? 'bg-blue-50 text-[#0071E3]' : 
                role === 'instructor' ? 'bg-indigo-50 text-[#5E5CE6]' : 
                'bg-green-50 text-[#34C759]'}`}>
              {role === 'student' && <GraduationCap size={32} />}
              {role === 'instructor' && <BookOpen size={32} />}
              {role === 'admin' && <ShieldCheck size={32} />}
            </div>
            <h2 className="text-2xl font-bold capitalize">{role} Login</h2>
            <p className="text-[#86868B] text-sm mt-1">Please sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#1D1D1F]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 rounded-xl transition-all outline-none" 
                  placeholder="name@educonnect.com"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#1D1D1F]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 rounded-xl transition-all outline-none" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#0071E3] hover:underline font-medium">Forgot Password?</a>
            </div>

            <Button type="submit" className="w-full py-3" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-[#86868B]">For prototype demo, use any email and password.</p>
          </div>
        </Card>
      </div>
    );
  }

  // Authenticated App
  return (
    <Layout 
      role={role} 
      currentView={currentView} 
      setView={setCurrentView} 
      onLogout={handleLogout}
    >
      {role === 'student' && <StudentViews view={currentView} />}
      {role === 'instructor' && <InstructorViews view={currentView} />}
      {role === 'admin' && <AdminViews view={currentView} />}
    </Layout>
  );
};

export default App;