import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Sprout,
  Sun,
  CloudRain,
  TrendingUp,
  Truck,
  PlusCircle,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  Package,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  DollarSign
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    weatherAdvisory,
    priceTrends,
    listings,
    orders,
    placeOrder,
    addCropListing
  } = useStore();

  const [orderModalCrop, setOrderModalCrop] = useState(null);
  const [orderQty, setOrderQty] = useState(5);
  const [buyerName, setBuyerName] = useState('Metro Food Co-op');

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newFarmer, setNewFarmer] = useState('');
  const [newLocation, setNewLocation] = useState('Yakima Valley, WA');
  const [newCategory, setNewCategory] = useState('Grains');
  const [newPrice, setNewPrice] = useState('280');
  const [newUnit, setNewUnit] = useState('Ton');
  const [newQty, setNewQty] = useState('50');
  const [newDesc, setNewDesc] = useState('');

  const categories = ['All', 'Grains', 'Vegetables', 'Oils & Specialty'];

  const filteredListings = listings.filter(l =>
    selectedCategory === 'All' ? true : l.category === selectedCategory
  );

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderModalCrop) return;
    placeOrder({
      cropId: orderModalCrop.id,
      title: orderModalCrop.title,
      farmer: orderModalCrop.farmer,
      quantity: Number(orderQty),
      unit: orderModalCrop.unit,
      totalCost: Number(orderQty) * orderModalCrop.price,
      buyerName
    });
    setOrderModalCrop(null);
  };

  const handleListingSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newFarmer.trim()) return;
    addCropListing({
      title: newTitle,
      farmer: newFarmer,
      farmLocation: newLocation,
      category: newCategory,
      price: Number(newPrice),
      unit: newUnit,
      availableQty: Number(newQty),
      minOrder: 1,
      harvestDate: 'Current Season',
      moistureContent: 'Verified Dry',
      description: newDesc || 'Direct harvest from sustainable family-operated farm.'
    });
    setNewTitle('');
    setNewFarmer('');
    setNewDesc('');
  };

  return (
    <div className="min-h-screen bg-[#fefce8] text-stone-900 font-sans flex flex-col selection:bg-lime-700 selection:text-white">
      {/* Top Agricultural Navigation */}
      <header className="bg-[#365314] text-white border-b border-lime-900 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-lime-400 to-yellow-300 text-[#365314] flex items-center justify-center font-bold shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block leading-tight">TerraAgri</span>
              <span className="text-[10px] text-lime-300 font-mono font-bold uppercase tracking-wider">
                FARMER-TO-BUYER PRODUCE & COMMODITY EXCHANGE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-[#24390d] p-1 rounded-2xl border border-lime-900 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'marketplace' ? 'bg-lime-500 text-[#365314] font-bold shadow-sm' : 'text-lime-100 hover:text-white'
                }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setActiveTab('price-trends')}
                className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'price-trends' ? 'bg-lime-500 text-[#365314] font-bold shadow-sm' : 'text-lime-100 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" /> Price Index
              </button>
              <button
                onClick={() => setActiveTab('advisory')}
                className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'advisory' ? 'bg-lime-500 text-[#365314] font-bold shadow-sm' : 'text-lime-100 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Weather Advisory
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === 'orders' ? 'bg-lime-500 text-[#365314] font-bold shadow-sm' : 'text-lime-100 hover:text-white'
                }`}
              >
                Freight Orders ({orders.length})
              </button>
            </nav>

            <button
              onClick={() => setActiveTab('farmer-hub')}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" /> List Harvest
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* MARKETPLACE BROWSE */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-lime-200 pb-3">
              <div>
                <h1 className="text-2xl font-black text-[#365314]">Direct-From-Field Crop & Grain Exchange</h1>
                <p className="text-xs text-stone-600 font-mono">Buy bulk lots directly from certified farms with zero broker commissions</p>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-lime-200">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCategory === cat
                        ? 'bg-[#365314] text-white shadow-sm'
                        : 'text-stone-700 hover:bg-lime-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Produce Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredListings.map(crop => (
                <div
                  key={crop.id}
                  className="bg-white rounded-3xl border border-lime-200/80 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-52 overflow-hidden bg-lime-50">
                    <img
                      src={crop.image}
                      alt={crop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                      {crop.category}
                    </span>
                    {crop.organicCertified && (
                      <span className="absolute top-3 right-3 bg-lime-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> USDA Organic
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-lime-800 font-bold">{crop.farmer}</span>
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" /> {crop.rating} ({crop.reviewsCount})
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-stone-900 leading-snug">{crop.title}</h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-lime-700" /> {crop.farmLocation}
                      </p>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{crop.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-lime-100">
                      <div className="flex items-baseline justify-between font-mono">
                        <div>
                          <span className="text-2xl font-black text-[#365314]">${crop.price}</span>
                          <span className="text-xs text-stone-500"> / {crop.unit}</span>
                        </div>
                        <span className="text-xs text-stone-600 font-bold">{crop.availableQty} {crop.unit}s Available</span>
                      </div>

                      <button
                        onClick={() => {
                          setOrderModalCrop(crop);
                          setOrderQty(crop.minOrder || 5);
                        }}
                        className="w-full py-2.5 bg-[#365314] hover:bg-[#24390d] text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 transition"
                      >
                        <Package className="w-4 h-4" /> Place Freight Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MARKET PRICE TRENDS */}
        {activeTab === 'price-trends' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-lime-200 pb-3">
              <h2 className="font-black text-2xl text-[#365314]">National Agricultural Commodity Index & Spot Prices</h2>
              <p className="text-xs text-stone-600 font-mono">Real-time daily wholesale prices across North American regional hubs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priceTrends.map((trend, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-lime-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-stone-900">{trend.crop}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                      trend.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {trend.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {trend.change}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-2xl font-black text-[#365314]">{trend.currentPrice}</span>
                    <span className="text-xs text-stone-400">7-Day Range: {trend.low} - {trend.high}</span>
                  </div>

                  <div className="w-full h-1.5 bg-lime-100 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-600 rounded-full" style={{ width: '74%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEATHER & HARVEST ADVISORY */}
        {activeTab === 'advisory' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-lime-200 pb-3">
              <h2 className="font-black text-2xl text-[#365314]">Agronomic Weather Telemetry & Harvest Insights</h2>
              <p className="text-xs text-stone-600 font-mono">Micro-climate meteorological guidance to protect yield and grain quality</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-lime-200 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
                <div className="bg-lime-50/60 p-4 rounded-2xl border border-lime-100">
                  <span className="text-[10px] text-lime-800 uppercase block font-bold">Ambient Temp</span>
                  <span className="text-2xl font-black text-[#365314]">{weatherAdvisory.temperature}</span>
                </div>
                <div className="bg-lime-50/60 p-4 rounded-2xl border border-lime-100">
                  <span className="text-[10px] text-lime-800 uppercase block font-bold">Soil Moisture</span>
                  <span className="text-2xl font-black text-emerald-700">{weatherAdvisory.soilMoisture}</span>
                </div>
                <div className="bg-lime-50/60 p-4 rounded-2xl border border-lime-100">
                  <span className="text-[10px] text-lime-800 uppercase block font-bold">Pest Risk Index</span>
                  <span className="text-2xl font-black text-lime-700">{weatherAdvisory.pestRisk}</span>
                </div>
              </div>

              <div className="bg-[#365314] text-white p-6 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-yellow-300 font-bold font-mono text-xs uppercase">
                  <Sun className="w-4 h-4" /> Agronomist Field Advisory
                </div>
                <p className="text-xs leading-relaxed text-lime-100 font-mono">{weatherAdvisory.tip}</p>
              </div>
            </div>
          </div>
        )}

        {/* FREIGHT ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-b border-lime-200 pb-3">
              <h2 className="font-black text-2xl text-[#365314]">Commercial Freight & Produce Orders</h2>
              <p className="text-xs text-stone-600 font-mono">Direct consignment tracking from farm gate to distribution depot</p>
            </div>

            <div className="space-y-4">
              {orders.map(ord => (
                <div key={ord.id} className="bg-white p-6 rounded-3xl border border-lime-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-lime-100 text-lime-800 rounded-full text-xs font-mono font-bold">
                        {ord.status}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">{ord.orderDate}</span>
                    </div>

                    <h3 className="font-bold text-base text-stone-900">{ord.title}</h3>
                    <p className="text-xs text-stone-600 font-mono">Farmer: {ord.farmer} • Buyer: {ord.buyerName}</p>
                    <div className="text-xs font-mono text-[#365314] font-bold">
                      Quantity: {ord.quantity} {ord.unit}s
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-400 font-mono block">Consignment Total</span>
                    <span className="text-2xl font-black text-[#365314] font-mono">${ord.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FARMER HUB / LIST HARVEST */}
        {activeTab === 'farmer-hub' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-lime-200 pb-3">
              <h2 className="font-black text-2xl text-[#365314]">List Farm Produce & Grain Lots</h2>
              <p className="text-xs text-stone-600 font-mono">Publish available inventory directly to regional wholesale buyers</p>
            </div>

            <form onSubmit={handleListingSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-lime-200 shadow-sm space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Crop / Produce Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Non-GMO Red Winter Wheat"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-lime-700 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Farm / Producer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prairie Star Farms"
                    value={newFarmer}
                    onChange={e => setNewFarmer(e.target.value)}
                    className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-lime-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Crop Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-lime-700"
                  >
                    <option value="Grains">Grains & Cereals</option>
                    <option value="Vegetables">Vegetables & Roots</option>
                    <option value="Oils & Specialty">Oils & Specialty Extracts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Price ($ USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-lime-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Unit</label>
                  <select
                    value={newUnit}
                    onChange={e => setNewUnit(e.target.value)}
                    className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-lime-700"
                  >
                    <option value="Ton">Ton (Metric)</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="Liter">Liter (L)</option>
                    <option value="Bushel">Bushel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-700 font-bold">Total Available</label>
                  <input
                    type="number"
                    value={newQty}
                    onChange={e => setNewQty(e.target.value)}
                    className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-lime-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Farm Location / Region</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:border-lime-700"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#365314] hover:bg-[#24390d] text-white font-bold rounded-xl shadow-md transition"
                >
                  Publish Crop Lot to Exchange
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* FREIGHT ORDER MODAL */}
      {orderModalCrop && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-lime-200">
            <div className="flex items-center gap-3 border-b border-lime-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-lime-100 flex items-center justify-center text-[#365314]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900">Direct Purchase Order</h3>
                <span className="text-xs text-lime-800 font-mono">{orderModalCrop.farmer}</span>
              </div>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs font-mono">
              <div className="bg-lime-50/50 p-3.5 rounded-2xl border border-lime-200 space-y-1">
                <div className="font-bold text-stone-900">{orderModalCrop.title}</div>
                <div className="text-stone-500">Unit Rate: ${orderModalCrop.price} / {orderModalCrop.unit}</div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Order Quantity ({orderModalCrop.unit}s)</label>
                <input
                  type="number"
                  min="1"
                  max={orderModalCrop.availableQty}
                  value={orderQty}
                  onChange={e => setOrderQty(Number(e.target.value))}
                  className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900 font-bold text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-700 font-bold">Buyer Company / Facility</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  className="w-full bg-lime-50/30 border border-lime-200 rounded-xl p-2.5 text-stone-900"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-lime-100 text-sm">
                <span className="text-stone-600 font-bold">Consignment Total:</span>
                <span className="text-xl font-black text-[#365314]">${(orderQty * orderModalCrop.price).toLocaleString()}.00</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOrderModalCrop(null)}
                  className="w-1/2 py-2.5 bg-stone-100 text-stone-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#365314] hover:bg-[#24390d] text-white font-bold rounded-xl shadow-md"
                >
                  Confirm Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-lime-200 bg-white py-6 px-4 text-center text-xs font-mono text-[#365314]/70">
        TERRAAGRI • DIRECT FARM COMMODITY EXCHANGE • TRANSPARENT SPOT PRICE INDEX
      </footer>
    </div>
  );
}
