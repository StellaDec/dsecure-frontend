import React, { memo, useMemo } from 'react';
import { getProductImageConfig } from '@/utils/productIcons';
import { 
  HardDrive, File, Cpu, Activity, Server, Smartphone, 
  ShieldCheck, ArrowRightLeft, Snowflake, Search, Package 
} from 'lucide-react';

interface ProductImageProps {
  category: string;
  productName: string;
  version: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showDetails?: boolean;
}

export const ProductImage = memo<ProductImageProps>(({
  category,
  productName,
  version,
  size = 'medium',
  className = '',
  showDetails = true,
}) => {
  const config = useMemo(() => getProductImageConfig(category), [category]);
  
  const sizeConfig = useMemo(() => ({
    small: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-xs' },
    medium: { container: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-sm' },
    large: { container: 'w-48 h-64', icon: 'w-16 h-16', text: 'text-lg' },
  }), []);
  
  const currentSize = sizeConfig[size];
  const iconSize = useMemo(() => size === 'large' ? 128 : size === 'medium' ? 64 : 32, [size]);

  const IconComponent = useMemo(() => {
    switch (category) {
      case 'drive-eraser': return HardDrive;
      case 'file-eraser': return File;
      case 'hardware-diagnostics': return Cpu;
      case 'smart-diagnostic': return Activity;
      case 'virtual-machine-eraser': return Server;
      case 'smartphone-eraser': return Smartphone;
      case 'smartphone-diagnostic': return Smartphone;
      case 'autopilot-mdm': return ShieldCheck;
      case 'data-migration': return ArrowRightLeft;
      case 'freeze-state': return Snowflake;
      case 'forensic-imaging': return Search;
      default: return Package;
    }
  }, [category]);
  
  return (
    <div className={`${currentSize.container} bg-[#0e7c66] rounded-none border border-[#0e7c66] p-4 flex flex-col items-center justify-center text-white ${className}`}>
      {/* Product Icon */}
      <div className={`mb-3 flex items-center justify-center rounded-full bg-white/20 ${size === 'large' ? 'p-6' : size === 'medium' ? 'p-4' : 'p-2'}`}>
        <IconComponent className={`${currentSize.icon} text-white drop-shadow-md`} strokeWidth={1.5} />
      </div>
      
      {showDetails && (
        <div className="text-center space-y-1">
          {/* Product Brand */}
          <div className={`text-white font-bold tracking-wider ${currentSize.text}`}>
            D-Secure
          </div>
          
          {/* Product Category */}
          {size === 'large' && (
            <div className={`text-white ${currentSize.text === 'text-lg' ? 'text-sm' : 'text-xs'} opacity-90`}>
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </div>
          )}
          
          {/* Version */}
          {size === 'large' && (
            <div className={`text-white text-xs opacity-75`}>
              {version}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

export default ProductImage;