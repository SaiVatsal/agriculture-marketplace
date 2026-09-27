import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'marketplace', // 'marketplace' | 'price-trends' | 'advisory' | 'farmer-hub' | 'orders'
  selectedCategory: 'All',

  weatherAdvisory: {
    temperature: '24°C',
    condition: 'Partly Sunny • Ideal Harvesting Window',
    soilMoisture: 'Optimal (62%)',
    pestRisk: 'Low',
    tip: 'Incoming light precipitation in 48 hours. Recommend completing grain desiccation and storage bin aeration today.'
  },

  priceTrends: [
    { crop: 'Organic Durum Wheat', currentPrice: '$320 / Ton', change: '+8.4%', trend: 'up', high: '$345', low: '$290' },
    { crop: 'Heirloom San Marzano Tomatoes', currentPrice: '$1.85 / kg', change: '+12.1%', trend: 'up', high: '$2.10', low: '$1.40' },
    { crop: 'Cold-Pressed Extra Virgin Olive Oil', currentPrice: '$9.20 / L', change: '-2.3%', trend: 'down', high: '$10.50', low: '$8.80' },
    { crop: 'Sweet Hass Avocados', currentPrice: '$2.40 / kg', change: '+4.5%', trend: 'up', high: '$2.60', low: '$2.10' }
  ],

  listings: [
    {
      id: 'CROP-101',
      title: 'Certified Organic Golden Durum Wheat',
      farmer: 'Oak Ridge Agronomics (John Miller)',
      farmLocation: 'Willamette Valley, OR',
      category: 'Grains',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      price: 320,
      unit: 'Ton',
      availableQty: 45,
      minOrder: 2,
      harvestDate: 'Sep 18, 2026',
      moistureContent: '11.8%',
      rating: 4.9,
      reviewsCount: 38,
      organicCertified: true,
      description: 'High-protein durum wheat ideal for artisanal pasta and bread mills. Harvested under dry conditions and stored in climate-controlled silos.'
    },
    {
      id: 'CROP-102',
      title: 'Vine-Ripened Heirloom San Marzano Plum Tomatoes',
      farmer: 'SunValley Organic Farm (Maria Santos)',
      farmLocation: 'Central Valley, CA',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      price: 1.85,
      unit: 'kg',
      availableQty: 2500,
      minOrder: 50,
      harvestDate: 'Fresh Picked Daily',
      moistureContent: 'High Brix (6.8)',
      rating: 4.8,
      reviewsCount: 52,
      organicCertified: true,
      description: 'Intense sweetness and low acidity. Hand-picked at peak ripeness for commercial kitchens and gourmet sauce makers.'
    },
    {
      id: 'CROP-103',
      title: 'Cold-Extracted Single-Estate Extra Virgin Olive Oil',
      farmer: 'Castillo Olive Groves',
      farmLocation: 'Sonoma County, CA',
      category: 'Oils & Specialty',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
      price: 9.20,
      unit: 'Liter',
      availableQty: 800,
      minOrder: 20,
      harvestDate: 'Early Harvest 2026',
      moistureContent: '<0.2% Acidity',
      rating: 5.0,
      reviewsCount: 29,
      organicCertified: true,
      description: 'First cold extraction within 4 hours of harvest. Peppery finish with notes of green artichoke and cut grass.'
    }
  ],

  orders: [
    {
      id: 'ORD-771',
      cropId: 'CROP-101',
      title: 'Certified Organic Golden Durum Wheat',
      farmer: 'Oak Ridge Agronomics',
      quantity: 5,
      unit: 'Ton',
      totalCost: 1600,
      buyerName: 'Artisan Bakery Guild',
      status: 'In Transit (Truck #4)',
      orderDate: 'Sep 24, 2026'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (c) => set({ selectedCategory: c }),

  placeOrder: (orderData) => set((state) => {
    const newOrder = {
      id: `ORD-${Math.floor(772 + Math.random() * 900)}`,
      status: 'Dispatched to Freight',
      orderDate: 'Just now',
      ...orderData
    };
    return {
      orders: [newOrder, ...state.orders],
      activeTab: 'orders'
    };
  }),

  addCropListing: (cropData) => set((state) => {
    const newCrop = {
      id: `CROP-${Math.floor(104 + Math.random() * 900)}`,
      rating: 5.0,
      reviewsCount: 1,
      organicCertified: true,
      image: cropData.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
      ...cropData
    };
    return {
      listings: [newCrop, ...state.listings],
      activeTab: 'marketplace'
    };
  })
}));
