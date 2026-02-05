import React from 'react';
import { X } from 'lucide-react';

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl border border-[#E5E5EA] shadow-sm overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-300' : ''} ${className}`}
  >
    {children}
  </div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none rounded-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#0071E3] text-white hover:bg-[#0077ED] shadow-sm hover:shadow",
    secondary: "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA]",
    outline: "border border-[#E5E5EA] text-[#1D1D1F] hover:bg-[#F5F5F7] bg-white",
    ghost: "text-[#0071E3] hover:bg-[#0071E3]/10 bg-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' }> = ({ children, color = 'blue' }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-[#E5E5EA] flex justify-between items-center bg-[#F5F5F7]/50">
          <h3 className="text-lg font-semibold text-[#1D1D1F]">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Toast ---
// A simple toast context could be built, but for this prototype, we'll use a local state implementation in App or Views.
export const Toast: React.FC<{ message: string; show: boolean; type?: 'success' | 'error' }> = ({ message, show, type = 'success' }) => {
  if (!show) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 ${type === 'success' ? 'bg-[#34C759] text-white' : 'bg-[#FF3B30] text-white'}`}>
      <span className="font-medium">{message}</span>
    </div>
  );
};