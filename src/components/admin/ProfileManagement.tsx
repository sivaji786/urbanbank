import { useState, useEffect } from 'react';
import { User, Lock, Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import client from '../../api/client';
import { toast } from 'sonner';

export function ProfileManagement() {
    const [profile, setProfile] = useState({
        username: '',
        full_name: '',
        email: ''
    });
    const [passwords, setPasswords] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await client.get('me');
            setProfile({
                username: res.data.username || '',
                full_name: res.data.full_name || '',
                email: res.data.email || ''
            });
        } catch (error) {
            toast.error('Failed to fetch profile data');
        } finally {
            setFetching(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await client.post('update-profile', profile);
            toast.success('Profile updated successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new_password !== passwords.confirm_password) {
            toast.error('New passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await client.post('change-password', {
                old_password: passwords.old_password,
                new_password: passwords.new_password
            });
            toast.success('Password changed successfully');
            setPasswords({ old_password: '', new_password: '', confirm_password: '' });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#0099ff]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0099ff]">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight font-['Poppins']">Profile Settings</h2>
                        <p className="text-gray-500 text-sm font-medium">Manage your administrative identity.</p>
                    </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Username</label>
                        <input
                            type="text"
                            value={profile.username}
                            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] outline-none transition-all text-sm font-medium"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                        <input
                            type="text"
                            value={profile.full_name}
                            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] outline-none transition-all text-sm font-medium"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] outline-none transition-all text-sm font-medium"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div className="md:col-span-2 pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-[#0099ff] hover:bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Profile Changes
                        </Button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight font-['Poppins']">Security</h2>
                        <p className="text-gray-500 text-sm font-medium">Update your password to keep your account secure.</p>
                    </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Password</label>
                            <input
                                type="password"
                                value={passwords.old_password}
                                onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] outline-none transition-all text-sm font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">New Password</label>
                            <input
                                type="password"
                                value={passwords.new_password}
                                onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] outline-none transition-all text-sm font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwords.confirm_password}
                                onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] outline-none transition-all text-sm font-medium"
                                required
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
