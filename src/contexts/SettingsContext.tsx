import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

interface Settings {
    site_name: string;
    site_tagline: string;
    site_description: string;
    contact_email: string;
    support_phone: string;
    domain_name: string;
    visitor_count_offset: number;
    [key: string]: any;
}

interface SettingsContextType {
    settings: Settings;
    loading: boolean;
    refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
    site_name: 'The Guntur Co-operative Urban Bank Limited',
    site_tagline: 'Banking Excellence Since 1981',
    site_description: 'Guntur Urban Co-operative Bank - Providing trusted banking services to our community.',
    contact_email: '',
    support_phone: '1800-425-8873',
    domain_name: 'https://guntururbanbank.org',
    visitor_count_offset: 0,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const response = await client.get('settings');
            if (response.data) {
                setSettings({
                    ...defaultSettings,
                    ...response.data
                });
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
