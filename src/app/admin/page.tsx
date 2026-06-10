"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, CheckCircle2, Lock, Eye, UploadCloud, X, LayoutDashboard, Utensils, Image as ImageIcon, CalendarDays, Mail, GripVertical, ChevronDown, Search, Check, Settings } from "lucide-react";
import DatePicker from "@/components/DatePicker";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [data, setData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroButton: "",
    heroImage: "",
    exploreMenuTitle: "",
    exploreMenuDesc: "",
    exploreMenuImage: ""
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Example state for drag-and-drop
  const [menuItems, setMenuItems] = useState([
    { id: "1", name: "Wagyu A5 Striploin", desc: "Miyazaki beef, truffle ponzu, pickled wasabi", price: "$125", img: "/restaurant_food_1.png" },
    { id: "2", name: "Hokkaido Scallops", desc: "Yuzu kosho butter, compressed cucumber", price: "$42", img: null }
  ]);
  const [galleryImages, setGalleryImages] = useState([
    { id: "1", src: "/restaurant_hero.png" },
    { id: "2", src: "/restaurant_food_1.png" }
  ]);

  const [draggedItemType, setDraggedItemType] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number, type: "menu" | "gallery") => {
    setDraggedItemIndex(index);
    setDraggedItemType(type);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e: React.DragEvent, index: number, type: "menu" | "gallery") => {
    if (draggedItemIndex === null || draggedItemIndex === index || draggedItemType !== type) return;
    
    if (type === "menu") {
      const newItems = [...menuItems];
      const draggedItem = newItems[draggedItemIndex];
      newItems.splice(draggedItemIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setDraggedItemIndex(index);
      setMenuItems(newItems);
    } else {
      const newImages = [...galleryImages];
      const draggedImg = newImages[draggedItemIndex];
      newImages.splice(draggedItemIndex, 1);
      newImages.splice(index, 0, draggedImg);
      setDraggedItemIndex(index);
      setGalleryImages(newImages);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDraggedItemType(null);
  };

  useEffect(() => {
    fetch("/api/cms")
      .then(res => res.json())
      .then(json => {
        setData({
          ...json,
          heroImage: json.heroImage || "/restaurant_hero.png",
          exploreMenuImage: json.exploreMenuImage || "/restaurant_food_1.png"
        });
        setIsLoading(false);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCreds.username === "admin" && loginCreds.password === "admin") {
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const json = await res.json();
      if (json.success) {
        setData({ ...data, [field]: json.url });
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
    setIsSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-4 font-sans">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-light border border-white/10 p-10 rounded-3xl w-full max-w-md">
          <div className="flex justify-center mb-6"><Lock size={48} className="text-gray-400" /></div>
          <h1 className="text-3xl font-bold text-center mb-8 tracking-tight">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="text" placeholder="Username" value={loginCreds.username} onChange={e => setLoginCreds({...loginCreds, username: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30" />
            <input type="password" placeholder="Password" value={loginCreds.password} onChange={e => setLoginCreds({...loginCreds, password: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30" />
            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors">Sign In</button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white"><Loader2 className="animate-spin" size={48} /></div>;

  const navItems = [
    { id: "home", label: "Home Page", icon: <LayoutDashboard size={20} /> },
    { id: "menu", label: "Menu Catalog", icon: <Utensils size={20} /> },
    { id: "gallery", label: "Gallery", icon: <ImageIcon size={20} /> },
    { id: "booking", label: "Reservations", icon: <CalendarDays size={20} /> },
    { id: "contact", label: "Contact Info", icon: <Mail size={20} /> },
  ];

  return (
    <div className="h-screen bg-black text-white font-sans flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface-light border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-2xl font-bold tracking-tight">Aurora CMS</h1>
          <p className="text-xs text-gray-500 mt-1">v1.0.0</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                activeTab === item.id ? "bg-white text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => setIsAuthenticated(false)} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-500 hover:text-white transition-colors">
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 overflow-y-auto relative bg-[#050505]">
        <div className="w-full max-w-[1600px] mx-auto px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {navItems.find(i => i.id === activeTab)?.label}
              </h1>
              <p className="text-gray-400">Manage the content and layout for this page.</p>
            </motion.div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowPreview(true)} className="bg-surface-light border border-white/10 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                <Eye size={18} /> Preview Site
              </button>
              <button onClick={handleSave} disabled={isSaving} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
                {isSaving ? "Saving..." : "Publish Changes"}
              </button>
            </div>
          </div>

          {showSuccess && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-2 text-green-400 bg-green-400/10 px-6 py-4 rounded-2xl font-bold">
              <CheckCircle2 size={20} /> Your changes have been published successfully!
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            
            {activeTab === "home" && (
              <div className="space-y-8">
                {/* Hero Section Bento Box */}
                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">1</span> Hero Section</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-4 ml-2">Hero Background Image</label>
                      <div className="relative border-2 border-dashed border-white/10 rounded-3xl p-10 text-center hover:bg-white/5 transition-colors group cursor-pointer overflow-hidden bg-black/50">
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "heroImage")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        {data.heroImage && data.heroImage !== "" ? (
                          <div className="absolute inset-0 w-full h-full">
                            <img src={data.heroImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" alt="Preview" />
                          </div>
                        ) : null}
                        <div className="relative z-20 flex flex-col items-center">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <UploadCloud size={32} />
                          </div>
                          <p className="font-bold text-lg mb-1">Drag & drop to upload</p>
                          <p className="text-sm text-gray-400">or click to browse files</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Hero Title</label>
                        <input type="text" name="heroTitle" value={data.heroTitle} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Hero Subtitle</label>
                        <textarea name="heroSubtitle" rows={4} value={data.heroSubtitle} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Button Text</label>
                        <input type="text" name="heroButton" value={data.heroButton} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explore Menu Box */}
                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">2</span> Explore Banner</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-4 ml-2">Banner Background Image</label>
                      <div className="relative border-2 border-dashed border-white/10 rounded-3xl p-10 text-center hover:bg-white/5 transition-colors group cursor-pointer overflow-hidden bg-black/50">
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "exploreMenuImage")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        {data.exploreMenuImage && data.exploreMenuImage !== "" ? (
                          <div className="absolute inset-0 w-full h-full">
                            <img src={data.exploreMenuImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" alt="Preview" />
                          </div>
                        ) : null}
                        <div className="relative z-20 flex flex-col items-center">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <UploadCloud size={32} />
                          </div>
                          <p className="font-bold text-lg mb-1">Drag & drop to upload</p>
                          <p className="text-sm text-gray-400">or click to browse files</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Banner Title</label>
                        <input type="text" name="exploreMenuTitle" value={data.exploreMenuTitle} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Banner Description</label>
                        <input type="text" name="exploreMenuDesc" value={data.exploreMenuDesc} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "menu" && (
              <div className="space-y-8">
                
                {/* Menu Layout Configuration */}
                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Menu Layout Settings</h2>
                      <p className="text-sm text-gray-400">Choose how your menu items are displayed on the public site.</p>
                    </div>
                    <div className="relative">
                      <select className="appearance-none bg-black border border-white/10 text-white py-3 pl-4 pr-10 rounded-xl font-bold focus:outline-none focus:border-white/30 cursor-pointer">
                        <option value="1">1 Column (List View)</option>
                        <option value="2">2 Columns Grid</option>
                        <option value="3">3 Columns Grid</option>
                        <option value="4">4 Columns Grid</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-3"><Utensils size={24}/> Manage Menu Items</h2>
                      <p className="text-sm text-gray-400 mt-1">Drag the handle on the left to reorder your dishes.</p>
                    </div>
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">+ Add New Dish</button>
                  </div>
                  
                  <div className="space-y-4">
                    {menuItems.map((item, index) => (
                      <div 
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index, "menu")}
                        onDragEnter={(e) => handleDragEnter(e, index, "menu")}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        className={`bg-black border rounded-2xl p-4 flex items-center gap-4 group transition-all duration-300 ${draggedItemType === "menu" && draggedItemIndex === index ? "opacity-50 border-white/50" : "border-white/10 hover:border-white/30"}`}
                      >
                        <div className="cursor-grab text-gray-600 group-hover:text-gray-300 active:cursor-grabbing p-2">
                          <GripVertical size={20} />
                        </div>
                        {item.img ? (
                          <div className="w-20 h-20 bg-white/5 rounded-xl overflow-hidden shrink-0"><img src={item.img} className="w-full h-full object-cover opacity-80" /></div>
                        ) : (
                          <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 shrink-0"><ImageIcon size={24}/></div>
                        )}
                        <div className="flex-1">
                          <input type="text" defaultValue={item.name} className="bg-transparent text-lg font-bold text-white focus:outline-none w-full" />
                          <input type="text" defaultValue={item.desc} className="bg-transparent text-sm text-gray-400 focus:outline-none w-full mt-1" />
                        </div>
                        <div className="w-24">
                          <input type="text" defaultValue={item.price} className="bg-transparent text-lg font-bold text-white focus:outline-none text-right w-full" />
                        </div>
                        <button className="text-red-400 hover:text-red-300 p-2"><X size={20}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-8">
                
                {/* Gallery Layout Configuration */}
                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Gallery Grid Options</h2>
                      <p className="text-sm text-gray-400">Control how many images appear side-by-side on large screens.</p>
                    </div>
                    <div className="relative">
                      <select defaultValue="3" className="appearance-none bg-black border border-white/10 text-white py-3 pl-4 pr-10 rounded-xl font-bold focus:outline-none focus:border-white/30 cursor-pointer">
                        <option value="2">2 Images per row</option>
                        <option value="3">3 Images per row</option>
                        <option value="4">4 Images per row</option>
                        <option value="5">5 Images per row</option>
                        <option value="6">6 Images per row</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-3"><ImageIcon size={24}/> Image Gallery</h2>
                      <p className="text-sm text-gray-400 mt-1">Drag and drop images to rearrange their display order.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Upload Box */}
                    <div className="aspect-square border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-white/5 transition-colors cursor-pointer">
                      <UploadCloud size={32} className="mb-2" />
                      <span className="text-sm font-bold">Upload Image</span>
                    </div>

                    {/* Example Images */}
                    {galleryImages.map((img, index) => (
                      <div 
                        key={img.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index, "gallery")}
                        onDragEnter={(e) => handleDragEnter(e, index, "gallery")}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        className={`aspect-square relative rounded-2xl overflow-hidden group border border-white/10 cursor-grab active:cursor-grabbing transition-opacity duration-300 ${draggedItemType === "gallery" && draggedItemIndex === index ? "opacity-50" : ""}`}
                      >
                        <img src={img.src} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-2 left-2 bg-black/50 p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <GripVertical size={16} />
                        </div>
                        <button className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"><X size={16}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "booking" && (
              <div className="space-y-8">
                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6 xl:gap-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3"><CalendarDays size={24}/> Recent Reservations</h2>
                    
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full xl:w-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Show</span>
                        <div className="relative">
                          <select className="appearance-none bg-black border border-white/10 text-white py-2 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:border-white/30 cursor-pointer">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <span className="text-sm text-gray-400">entries</span>
                      </div>

                      <div className="flex items-center gap-1 bg-black border border-white/10 rounded-xl px-2 py-1 w-full sm:w-auto">
                        <span className="text-sm font-bold text-gray-500 pl-2 shrink-0">From</span>
                        <DatePicker value={fromDate} onChange={setFromDate} placeholder="mm/dd/yyyy" />
                        <div className="w-px h-4 bg-white/10 mx-1 shrink-0"></div>
                        <span className="text-sm font-bold text-gray-500 pl-1 shrink-0">To</span>
                        <DatePicker value={toDate} onChange={setToDate} placeholder="mm/dd/yyyy" />
                      </div>

                      <div className="relative w-full sm:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="text" placeholder="Search reservations..." className="w-full bg-black border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/30" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-400 text-sm">
                          <th className="pb-4 font-bold pl-2">Guest Name</th>
                          <th className="pb-4 font-bold">Date & Time</th>
                          <th className="pb-4 font-bold">Party</th>
                          <th className="pb-4 font-bold">Status</th>
                          <th className="pb-4 font-bold text-right pr-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-4 font-bold pl-2 rounded-l-xl">Michael Scott</td>
                          <td className="py-4 text-gray-300">Oct 24, 19:00</td>
                          <td className="py-4 text-gray-300">2 guests</td>
                          <td className="py-4"><span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30">Pending</span></td>
                          <td className="py-4 text-right pr-2 rounded-r-xl">
                            <div className="flex items-center justify-end gap-2">
                              <button className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/40 transition-colors" title="Approve">
                                <Check size={16} />
                              </button>
                              <button className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/40 transition-colors" title="Reject">
                                <X size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-4 font-bold pl-2 rounded-l-xl">Sarah Jenkins</td>
                          <td className="py-4 text-gray-300">Oct 24, 20:30</td>
                          <td className="py-4 text-gray-300">4 guests</td>
                          <td className="py-4"><span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">Confirmed</span></td>
                          <td className="py-4 text-right pr-2 rounded-r-xl">
                            <div className="flex items-center justify-end gap-2">
                              <button className="w-8 h-8 rounded-full bg-gray-500/20 text-gray-400 flex items-center justify-center hover:bg-gray-500/40 transition-colors" title="Manage">
                                <Settings size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="py-4 font-bold pl-2 rounded-l-xl">Jim Halpert</td>
                          <td className="py-4 text-gray-300">Oct 25, 18:00</td>
                          <td className="py-4 text-gray-300">3 guests</td>
                          <td className="py-4"><span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">Confirmed</span></td>
                          <td className="py-4 text-right pr-2 rounded-r-xl">
                            <div className="flex items-center justify-end gap-2">
                              <button className="w-8 h-8 rounded-full bg-gray-500/20 text-gray-400 flex items-center justify-center hover:bg-gray-500/40 transition-colors" title="Manage">
                                <Settings size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
                    <p className="text-sm text-gray-400">Showing 1 to 3 of 3 entries</p>
                    <div className="flex gap-1">
                      <button className="px-4 py-2 bg-black border border-white/10 rounded-l-xl text-sm text-gray-400 hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
                      <button className="px-4 py-2 bg-white text-black border border-white/10 text-sm font-bold">1</button>
                      <button className="px-4 py-2 bg-black border border-white/10 rounded-r-xl text-sm text-gray-400 hover:bg-white/5 disabled:opacity-50" disabled>Next</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-8">
                <div className="bg-surface-light border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><Mail size={24}/> Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Address</label>
                      <input type="text" defaultValue="123 Culinary Blvd, NY 10001" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Phone Number</label>
                        <input type="text" defaultValue="+1 (555) 123-4567" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Email Address</label>
                        <input type="text" defaultValue="hello@aurora.com" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Google Maps Embed URL</label>
                      <input type="text" defaultValue="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-gray-500 focus:outline-none focus:border-white/30 transition-colors font-mono text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </main>

      {/* Full Screen Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: "100%" }} 
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <div className="h-16 bg-surface-light border-b border-white/10 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 font-bold text-gray-400 flex items-center gap-2"><Eye size={16}/> Live Preview Mode</span>
              </div>
              <button onClick={() => setShowPreview(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <iframe ref={iframeRef} src="/" className="w-full flex-1 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
