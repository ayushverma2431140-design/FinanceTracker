import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Bell, Lock, User, Monitor, Download, Trash2, Check, ChevronDown } from 'lucide-react';

export function Settings() {
  const [currency, setCurrency] = useState('USD');
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [saved, setSaved] = useState(false);

  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <>
            <Card className="border-[#27272a] shadow-xl bg-[#18181b] animate-in fade-in slide-in-from-bottom-2">
              <CardHeader className="border-b border-[#27272a] pb-4">
                <CardTitle className="text-[#fafafa]">Profile Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center text-[#fafafa] font-bold text-xl">
                    AV
                  </div>
                  <button className="px-4 py-2 bg-[#27272a] text-[#fafafa] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#3f3f46] transition-colors">
                    Change Avatar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">First Name</label>
                    <input type="text" defaultValue="Ayush" className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Last Name</label>
                    <input type="text" defaultValue="Verma" className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue="ayushverma2431140@gmail.com" className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#27272a] shadow-xl bg-[#18181b] animate-in fade-in slide-in-from-bottom-2">
              <CardHeader className="border-b border-[#27272a] pb-4">
                <CardTitle className="text-[#fafafa]">Preferences</CardTitle>
                <CardDescription>Adjust formatting and regional settings.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Currency</label>
                  <div className="relative">
                    <select 
                      value={currency} 
                      onChange={e => setCurrency(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner appearance-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#71717a] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-500/20 shadow-xl bg-[#18181b] animate-in fade-in slide-in-from-bottom-2">
              <CardHeader className="border-b border-[#27272a] pb-4">
                <CardTitle className="text-rose-500">Danger Zone</CardTitle>
                <CardDescription>Destructive actions for your account.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-[#fafafa]">Export Data</h4>
                    <p className="text-xs text-[#a1a1aa]">Download all your transactions as CSV.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#27272a] text-[#fafafa] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#3f3f46] transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-rose-500">Delete Account</h4>
                    <p className="text-xs text-[#a1a1aa]">Permanently delete all data.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-rose-500 hover:text-white transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          </>
        );
      case 'notifications':
        return (
          <Card className="border-[#27272a] shadow-xl bg-[#18181b] animate-in fade-in slide-in-from-bottom-2">
            <CardHeader className="border-b border-[#27272a] pb-4">
              <CardTitle className="text-[#fafafa]">Notifications</CardTitle>
              <CardDescription>Choose how you want to be alerted.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-[#fafafa]">Email Notifications</h4>
                  <p className="text-xs text-[#a1a1aa]">Receive weekly reports and alerts via email.</p>
                </div>
                <button 
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${emailNotif ? 'bg-emerald-500' : 'bg-[#27272a]'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${emailNotif ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-[#fafafa]">Push Notifications</h4>
                  <p className="text-xs text-[#a1a1aa]">Get real-time alerts on your device.</p>
                </div>
                <button 
                  onClick={() => setPushNotif(!pushNotif)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${pushNotif ? 'bg-emerald-500' : 'bg-[#27272a]'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${pushNotif ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-[#fafafa]">Budget Threshold Alerts</h4>
                  <p className="text-xs text-[#a1a1aa]">Notify me when a budget reaches 80% capacity.</p>
                </div>
                <button 
                  className="w-11 h-6 rounded-full transition-colors relative bg-emerald-500"
                >
                  <div className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all left-6" />
                </button>
              </div>
            </CardContent>
          </Card>
        );
      case 'security':
        return (
          <Card className="border-[#27272a] shadow-xl bg-[#18181b] animate-in fade-in slide-in-from-bottom-2">
            <CardHeader className="border-b border-[#27272a] pb-4">
              <CardTitle className="text-[#fafafa]">Security Settings</CardTitle>
              <CardDescription>Keep your account and data safe.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[#09090b] border border-[#27272a] text-[#fafafa] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner" />
              </div>
              <div className="flex justify-end pt-2">
                <button className="px-4 py-2 bg-[#27272a] text-[#fafafa] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#3f3f46] transition-colors">
                  Update Password
                </button>
              </div>
              <hr className="border-[#27272a] my-4" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-[#fafafa]">Two-Factor Authentication</h4>
                  <p className="text-xs text-[#a1a1aa]">Add an extra layer of security to your account.</p>
                </div>
                <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-black transition-colors">
                  Enable
                </button>
              </div>
            </CardContent>
          </Card>
        );
      case 'display':
        return (
          <Card className="border-[#27272a] shadow-xl bg-[#18181b] animate-in fade-in slide-in-from-bottom-2">
            <CardHeader className="border-b border-[#27272a] pb-4">
              <CardTitle className="text-[#fafafa]">Display & Appearance</CardTitle>
              <CardDescription>Customize how the app looks and feels directly.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">Theme</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-emerald-500 bg-[#09090b] p-4 rounded-xl cursor-pointer">
                    <div className="h-6 w-1/2 bg-[#27272a] rounded mb-2" />
                    <div className="h-4 w-full bg-[#18181b] rounded" />
                    <p className="text-sm font-bold text-[#fafafa] mt-4 text-center">Dark Theme</p>
                  </div>
                  <div className="border-2 border-[#27272a] bg-white p-4 rounded-xl cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                    <div className="h-6 w-1/2 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <p className="text-sm font-bold text-gray-900 mt-4 text-center">Light Theme</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-[#fafafa]">High Contrast</h4>
                  <p className="text-xs text-[#a1a1aa]">Increase contrast for better readability.</p>
                </div>
                <button className="w-11 h-6 rounded-full transition-colors relative bg-[#27272a]">
                  <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1" />
                </button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#fafafa] uppercase tracking-tight">Settings</h2>
        <p className="text-[#a1a1aa] mt-1 text-sm font-medium tracking-wide">Manage your account preferences and app settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === 'general' ? 'bg-[#27272a] text-[#fafafa] shadow-md font-bold' : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]'}`}
            >
              <User className={`w-4 h-4 ${activeTab === 'general' ? 'text-emerald-400' : ''}`} />
              General
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === 'notifications' ? 'bg-[#27272a] text-[#fafafa] shadow-md font-bold' : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]'}`}
            >
              <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-emerald-400' : ''}`} />
              Notifications
            </button>
            <button 
               onClick={() => setActiveTab('security')}
               className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === 'security' ? 'bg-[#27272a] text-[#fafafa] shadow-md font-bold' : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]'}`}
            >
              <Lock className={`w-4 h-4 ${activeTab === 'security' ? 'text-emerald-400' : ''}`} />
              Security
            </button>
            <button 
               onClick={() => setActiveTab('display')}
               className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === 'display' ? 'bg-[#27272a] text-[#fafafa] shadow-md font-bold' : 'text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#fafafa]'}`}
            >
              <Monitor className={`w-4 h-4 ${activeTab === 'display' ? 'text-emerald-400' : ''}`} />
              Display
            </button>
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          {renderTabContent()}

          <div className="flex justify-end pt-4 sticky bottom-6 z-10 bg-[#09090b]/80 backdrop-blur-sm p-4 rounded-2xl border border-[#27272a]">
            {saved && (
              <span className="flex items-center gap-2 text-emerald-500 text-sm font-medium mr-4 animate-in fade-in">
                <Check className="w-4 h-4" /> Saved automatically
              </span>
            )}
            <button 
              onClick={handleSave}
              className="px-6 py-3 bg-emerald-500 text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
