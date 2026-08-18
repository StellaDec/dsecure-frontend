// Product icon utility functions
export const getProductIcon = (category: string, size: number = 128): string => {
  // Use the Cloudinary image for all products
  return 'https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1759928831/bwsswefvwhdvuy8yrplk.png';
};

// Get icon for different product categories with specific styling
export const getProductImageConfig = (category: string) => {
  const baseConfig = {
    iconSize: 64,
    backgroundColor: 'from-gray-800 to-gray-900',
    accentColor: 'text-[#0a2e1e]',
  };

  switch (category) {
    case 'drive-eraser':
      return {
        ...baseConfig,
        backgroundColor: 'from-[#0e7c66] to-[#0a2e1e]',
        accentColor: 'text-[#d4ede4]',
        iconSize: 64,
      };
    case 'drive-eraser-diagnostic':
      return {
        ...baseConfig,
        backgroundColor: 'from-[#0e7c66] to-[#0a2e1e]',
        accentColor: 'text-[#d4ede4]',
        iconSize: 64,
      };
    case 'admin-console':
      return {
        ...baseConfig,
        backgroundColor: 'from-[#0e7c66] to-[#0a2e1e]',
        accentColor: 'text-[#d4ede4]',
        iconSize: 64,
      };
    case 'mobile-eraser':
      return {
        ...baseConfig,
        backgroundColor: 'from-[#0e7c66] to-[#0a2e1e]',
        accentColor: 'text-[#d4ede4]',
        iconSize: 64,
      };
    case 'file-eraser':
      return {
        ...baseConfig,
        backgroundColor: 'from-red-800 to-red-900',
        accentColor: 'text-red-400',
        iconSize: 64,
      };
    default:
      return baseConfig;
  }
};

// Available icon sizes from the iconset
export const AVAILABLE_ICON_SIZES = [16, 32, 64, 128, 256, 512];

// Get the best icon size for the given display size
export const getBestIconSize = (displaySize: number): number => {
  return AVAILABLE_ICON_SIZES.find(size => size >= displaySize) || 512;
};
