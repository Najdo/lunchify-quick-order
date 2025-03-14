
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const OrderButton: React.FC<OrderButtonProps> = ({ 
  onClick, 
  children, 
  className,
  loading = false
}) => {
  return (
    <motion.button
      onClick={loading ? undefined : onClick}
      className={cn(
        "bg-euricom text-white py-3 px-6 rounded-lg font-medium",
        "hover:bg-euricom-dark focus:outline-none focus:ring-2 focus:ring-euricom focus:ring-opacity-50",
        "transition-all duration-300 ease-in-out",
        "relative overflow-hidden flex items-center justify-center",
        loading && "cursor-not-allowed opacity-80",
        className
      )}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Bezig...</span>
        </div>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          {children}
        </>
      )}
    </motion.button>
  );
};

export default OrderButton;
