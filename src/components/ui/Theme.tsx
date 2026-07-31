import React, { ReactNode } from 'react';

/**
 * ============================================================================
 * D-SECURE GLOBAL DESIGN SYSTEM
 * ============================================================================
 * This file acts as the Single Source of Truth for the "Clinical Security" 
 * design system across the D-Secure frontend.
 * 
 * Rules:
 * 1. Buttons & Cards -> Always flat (rounded-none).
 * 2. Icon Containers -> Always circular (rounded-full).
 * 3. Colors -> Use the standard D-Secure palette below.
 * 4. Icons -> Strictly use Lucide React icons.
 * 
 * You can use either the `themeClasses` strings directly on your own HTML tags, 
 * or you can use the pre-built React components (<ThemeCard>, <ThemeButton>).
 */

// ----------------------------------------------------------------------------
// 1. THEME TOKENS (Constants for direct usage)
// ----------------------------------------------------------------------------
export const themeTokens = {
  colors: {
    primary: '#0e7c66',
    primaryDark: '#0a2e1e',
    primaryHover: '#083d28',
    backgroundLight: '#d4ede4',
    backgroundHover: '#f4fbf8',
    textMuted: '#5a6672',
    border: '#d0d5dc',
    white: '#ffffff',
  }
};

// ----------------------------------------------------------------------------
// 2. THEME CLASSES (Reusable Tailwind Strings)
// ----------------------------------------------------------------------------
export const themeClasses = {
  button: {
    base: "inline-flex items-center justify-center font-bold text-lg min-h-[44px] px-8 py-3 rounded-none transition-all duration-150 focus-visible:ring-2 focus-visible:outline-none cursor-pointer",
    primary: "bg-[#0e7c66] text-white border-2 border-[#0e7c66] hover:bg-[#0e7c66] focus-visible:ring-[#0e7c66] focus-visible:ring-offset-2",
    outline: "bg-transparent text-[#0a2e1e] border-2 border-[#0a2e1e] hover:bg-[#0e7c66]/10 focus-visible:ring-[#0a2e1e] focus-visible:ring-offset-2",
  },
  card: {
    base: "bg-white rounded-none border border-[#d0d5dc]/60 transition-all duration-150 ease-out flex flex-col relative overflow-hidden",
    hoverable: "hover:-translate-y-1 hover:shadow-lg",
    padding: "p-6 sm:p-8",
  },
  icon: {
    wrapper: "bg-[#d4ede4] rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-150 group-hover:bg-[#0e7c66]",
    wrapperSize: {
      md: "w-12 h-12",
      lg: "w-16 h-16",
    },
    lucide: "text-[#0e7c66] group-hover:text-white transition-colors duration-150",
    lucideSize: {
      md: "w-6 h-6",
      lg: "w-8 h-8",
    }
  },
  typography: {
    sectionHeading: "text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2e1e] mb-6 leading-tight",
    sectionSubtitle: "text-lg text-[#5a6672] max-w-3xl",
    cardTitle: "text-xl font-bold text-[#0a2e1e] mb-4 transition-colors duration-150 group-hover:text-[#0e7c66]",
    cardBody: "text-[#5a6672] leading-relaxed",
  },
  layout: {
    sectionBase: "py-12 md:py-16 lg:py-20",
    bgPrimary: "bg-white",
    bgAlternate: "bg-[#f4fbf8]" // Light green alternate background
  }
};

// ----------------------------------------------------------------------------
// 3. REACT COMPONENTS (Ready to use structural blocks)
// ----------------------------------------------------------------------------

/**
 * A standard Theme Button enforcing flat design and D-Secure colors.
 */
export interface ThemeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  icon?: ReactNode;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const variantClass = variant === 'primary' ? themeClasses.button.primary : themeClasses.button.outline;
  
  return (
    <button 
      className={`${themeClasses.button.base} ${variantClass} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

/**
 * A standard Theme Card enforcing flat borders and interactive states.
 */
export interface ThemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({ 
  children, 
  interactive = true, 
  className = '',
  ...props 
}) => {
  const interactiveClass = interactive ? themeClasses.card.hoverable : '';
  
  return (
    <div 
      className={`group ${themeClasses.card.base} ${themeClasses.card.padding} ${interactiveClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * A standard Icon Container that guarantees circular rendering and correct hover states.
 * Note: Wrap the icon inside this container and it will automatically handle colors.
 */
export interface ThemeIconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'md' | 'lg';
  icon: React.ElementType; // Pass a Lucide Icon reference, e.g. icon={Shield}
}

export const ThemeIconContainer: React.FC<ThemeIconContainerProps> = ({ 
  size = 'md', 
  icon: Icon,
  className = '',
  ...props
}) => {
  const wrapperSize = themeClasses.icon.wrapperSize[size];
  const iconSize = themeClasses.icon.lucideSize[size];
  
  return (
    <div 
      className={`${themeClasses.icon.wrapper} ${wrapperSize} ${className}`}
      {...props}
    >
      <Icon className={`${themeClasses.icon.lucide} ${iconSize}`} strokeWidth={2} />
    </div>
  );
};

/**
 * A standard Section Heading used for starting new blocks of content.
 */
export interface ThemeSectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  subtitle?: string;
  centered?: boolean;
}

export const ThemeSectionHeading: React.FC<ThemeSectionHeadingProps> = ({ 
  children, 
  subtitle,
  centered = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto' : ''} ${className}`} {...props}>
      <h2 className={`${themeClasses.typography.sectionHeading}`}>
        {children}
      </h2>
      {subtitle && (
        <p className={`${themeClasses.typography.sectionSubtitle} ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * A standard Page Section that automatically handles alternating background colors.
 * Pass an `index` (if in a map) or `alternate={true}` to automatically apply the alternating background.
 */
export interface ThemeSectionProps extends React.HTMLAttributes<HTMLElement> {
  index?: number;
  alternate?: boolean;
  noBg?: boolean;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({ 
  children, 
  index,
  alternate,
  noBg,
  className = '',
  ...props
}) => {
  // Use alternate background if explicitly requested, or if the index is odd
  const isAlternate = alternate || (index !== undefined && index % 2 !== 0);
  let bgClass = '';
  if (!noBg) {
    bgClass = isAlternate ? themeClasses.layout.bgAlternate : themeClasses.layout.bgPrimary;
  }
  
  return (
    <section 
      className={`${themeClasses.layout.sectionBase} ${bgClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
};
