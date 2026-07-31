import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

interface IconCardProps extends CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

interface ServiceCardProps extends CardProps {
  title: string;
  description: string;
  features?: string[];
  action?: ReactNode;
  image?: string;
}

// Base Card Component
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  clickable = false,
  onClick
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseClasses = `bg-white rounded-none shadow-lg ${paddingClasses[padding]}`;
  const hoverClasses = hover ? 'hover:shadow-xl transition-all duration-300' : '';
  const clickableClasses = clickable ? 'cursor-pointer transform hover:scale-105' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Icon Card Component
export const IconCard: React.FC<IconCardProps> = ({
  icon,
  title,
  description,
  action,
  iconBgColor = 'bg-[#d4ede4]',
  iconColor = 'text-[#0a2e1e]',
  className = '',
  hover = true,
  clickable = false,
  onClick
}) => {
  return (
    <Card 
      className={`text-center group ${className}`} 
      hover={hover} 
      clickable={clickable} 
      onClick={onClick}
    >
      <div className={`w-16 h-16 ${iconBgColor} rounded-none flex items-center justify-center mx-auto mb-6 group-hover:${iconBgColor.replace('100', '200')} transition-colors`}>
        <div className={`w-8 h-8 ${iconColor}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
      {action}
    </Card>
  );
};

// Service Card Component
export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features = [],
  action,
  image,
  className = '',
  hover = true,
  clickable = false,
  onClick
}) => {
  return (
    <Card 
      className={`${className}`} 
      hover={hover} 
      clickable={clickable} 
      onClick={onClick}
    >
      {image && (
        <div className="mb-6">
          <img loading="lazy" decoding="async" src={image} alt={title} className="w-full h-48 object-cover rounded-none" />
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
      
      {features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-slate-700">
              <svg className="w-5 h-5 text-[#0a2e1e] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      {action}
    </Card>
  );
};