import { useState, useEffect } from 'react';
import {
  Settings,
  Bell,
  MessageSquare,
  Send,
  Flame,
  Shield,
  Mail,
  Share2,
  Search,
  FileText,
  Map,
  Globe,
  BarChart3,
  ChevronRight,
  Save,
  Info
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Card } from '../ui/card';
import { toast } from 'sonner';
import client from '../../api/client';

type SettingsSection =
  | 'general'
  | 'notifications'
  | 'sms-gateway'
  | 'whatsapp'
  | 'firebase'
  | 'security'
  | 'mail'
  | 'social'
  | 'seo'
  | 'robots'
  | 'sitemap'
  | 'webmaster'
  | 'analytics';

export function SettingsManagement() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await client.get('/settings');
      setSettings(response.data || {});
    } catch (error) {
      console.error('Failed to fetch settings', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await client.post('/settings', settings);
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings', error);
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const menuItems = [
    { id: 'general' as SettingsSection, label: 'General', icon: Settings },
    { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell },
    { id: 'sms-gateway' as SettingsSection, label: 'SMS Gateway', icon: MessageSquare },
    { id: 'whatsapp' as SettingsSection, label: 'WhatsApp', icon: Send },
    { id: 'firebase' as SettingsSection, label: 'Firebase', icon: Flame },
    { id: 'security' as SettingsSection, label: 'Security', icon: Shield },
    { id: 'mail' as SettingsSection, label: 'Mail', icon: Mail },
    { id: 'social' as SettingsSection, label: 'Social', icon: Share2 },
    { id: 'seo' as SettingsSection, label: 'SEO', icon: Search },
    { id: 'robots' as SettingsSection, label: 'Robots', icon: FileText },
    { id: 'sitemap' as SettingsSection, label: 'Sitemap', icon: Map },
    { id: 'webmaster' as SettingsSection, label: 'Webmaster', icon: Globe },
    { id: 'analytics' as SettingsSection, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">
            Configure website settings. (Contact recipient managed in General to "Contact Email")
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="bg-[#0099ff] hover:bg-[#0088ee]">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Settings Menu */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="p-4">
            <nav className="space-y-1">
              {[
                { id: 'general' as SettingsSection, label: 'General', icon: Settings },
                { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell },
                { id: 'sms-gateway' as SettingsSection, label: 'SMS Gateway', icon: MessageSquare },
                { id: 'whatsapp' as SettingsSection, label: 'WhatsApp', icon: Send },
                { id: 'firebase' as SettingsSection, label: 'Firebase', icon: Flame },
                { id: 'security' as SettingsSection, label: 'Security', icon: Shield },
                { id: 'mail' as SettingsSection, label: 'Mail', icon: Mail },
                { id: 'social' as SettingsSection, label: 'Social', icon: Share2 },
                { id: 'seo' as SettingsSection, label: 'SEO', icon: Search },
                { id: 'robots' as SettingsSection, label: 'Robots', icon: FileText },
                { id: 'sitemap' as SettingsSection, label: 'Sitemap', icon: Map },
                { id: 'webmaster' as SettingsSection, label: 'Webmaster', icon: Globe },
                { id: 'analytics' as SettingsSection, label: 'Analytics', icon: BarChart3 },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${isActive
                      ? 'bg-[#0099ff] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="col-span-12 lg:col-span-9">
          <Card className="p-6">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">General Settings</h3>
                  <p className="text-sm text-gray-600">Basic website configuration</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="site_name">Site Name</Label>
                    <Input
                      id="site_name"
                      value={settings.site_name || 'Guntur Urban Co-operative Bank'}
                      onChange={(e) => updateSetting('site_name', e.target.value)}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="site-tagline">Tagline</Label>
                    <Input
                      id="site-tagline"
                      defaultValue="Banking Excellence Since 1981"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="site-description">Site Description</Label>
                    <Textarea
                      id="site-description"
                      defaultValue="Guntur Urban Co-operative Bank - Providing trusted banking services to our community."
                      rows={3}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact_email">Contact Recipient Email</Label>
                      <Input
                        id="contact_email"
                        type="email"
                        value={settings.contact_email || ''}
                        onChange={(e) => updateSetting('contact_email', e.target.value)}
                        placeholder="e.g. gcubhelpdesk@guntururbanbank.org"
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">This email will receive all "Contact Us" form submissions.</p>
                    </div>
                    <div>
                      <Label htmlFor="deposit_emails">Deposit Application Emails</Label>
                      <Input
                        id="deposit_emails"
                        value={settings.deposit_emails || ''}
                        onChange={(e) => updateSetting('deposit_emails', e.target.value)}
                        placeholder="e.g. gcubhelpdesk@guntururbanbank.org, admin@example.com"
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Comma-separated emails to receive deposit applications.</p>
                    </div>
                    <div>
                      <Label htmlFor="loan_emails">Loan Application Emails</Label>
                      <Input
                        id="loan_emails"
                        value={settings.loan_emails || ''}
                        onChange={(e) => updateSetting('loan_emails', e.target.value)}
                        placeholder="e.g. gcubhelpdesk@guntururbanbank.org, loan@example.com"
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Comma-separated emails to receive loan applications.</p>
                    </div>
                    <div>
                      <Label htmlFor="support-phone">Support Phone</Label>
                      <Input
                        id="support-phone"
                        defaultValue="1800-425-8873"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Maintenance Mode</p>
                      <p className="text-xs text-gray-600">Temporarily disable the website</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Registration</p>
                      <p className="text-xs text-gray-600">Allow new user registration</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Notification Settings</h3>
                  <p className="text-sm text-gray-600">Configure notification preferences</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Email Notifications</p>
                      <p className="text-xs text-gray-600">Receive email notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">SMS Notifications</p>
                      <p className="text-xs text-gray-600">Receive SMS alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Push Notifications</p>
                      <p className="text-xs text-gray-600">Browser push notifications</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">WhatsApp Notifications</p>
                      <p className="text-xs text-gray-600">Receive WhatsApp messages</p>
                    </div>
                    <Switch />
                  </div>

                  <div>
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input
                      id="notification-email"
                      type="email"
                      placeholder="admin@guntururbanbank.org"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* SMS Gateway Settings */}
            {activeSection === 'sms-gateway' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">SMS Gateway Settings</h3>
                  <p className="text-sm text-gray-600">Configure SMS service provider</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Enable SMS Gateway</p>
                      <p className="text-xs text-gray-600">Activate SMS sending functionality</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="sms-provider">SMS Provider</Label>
                    <select
                      id="sms-provider"
                      className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    >
                      <option>Twilio</option>
                      <option>MSG91</option>
                      <option>AWS SNS</option>
                      <option>Nexmo</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="sms-api-key">API Key</Label>
                    <Input
                      id="sms-api-key"
                      type="password"
                      placeholder="Enter your API key"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sms-api-secret">API Secret</Label>
                    <Input
                      id="sms-api-secret"
                      type="password"
                      placeholder="Enter your API secret"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sms-sender-id">Sender ID</Label>
                    <Input
                      id="sms-sender-id"
                      placeholder="GCUB"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900">Test SMS Configuration</p>
                        <p className="text-xs text-blue-700 mt-1">Send a test SMS to verify your settings</p>
                        <Button variant="outline" size="sm" className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
                          Send Test SMS
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* WhatsApp Settings */}
            {activeSection === 'whatsapp' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">WhatsApp Integration</h3>
                  <p className="text-sm text-gray-600">Configure WhatsApp Business API</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Enable WhatsApp</p>
                      <p className="text-xs text-gray-600">Activate WhatsApp messaging</p>
                    </div>
                    <Switch />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp-api">WhatsApp Business API Key</Label>
                    <Input
                      id="whatsapp-api"
                      type="password"
                      placeholder="Enter your WhatsApp API key"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp-phone">WhatsApp Business Number</Label>
                    <Input
                      id="whatsapp-phone"
                      placeholder="+91 9876543210"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp-webhook">Webhook URL</Label>
                    <Input
                      id="whatsapp-webhook"
                      placeholder="https://yourdomain.com/webhook/whatsapp"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Auto Reply</p>
                      <p className="text-xs text-gray-600">Send automated replies</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="whatsapp-message">Default Auto Reply Message</Label>
                    <Textarea
                      id="whatsapp-message"
                      placeholder="Thank you for contacting Guntur Urban Bank. We will get back to you shortly."
                      rows={3}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Firebase Settings */}
            {activeSection === 'firebase' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Firebase Configuration</h3>
                  <p className="text-sm text-gray-600">Connect to Firebase services</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Enable Firebase</p>
                      <p className="text-xs text-gray-600">Activate Firebase integration</p>
                    </div>
                    <Switch />
                  </div>

                  <div>
                    <Label htmlFor="firebase-api-key">Firebase API Key</Label>
                    <Input
                      id="firebase-api-key"
                      type="password"
                      placeholder="AIzaSy..."
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="firebase-project-id">Project ID</Label>
                    <Input
                      id="firebase-project-id"
                      placeholder="guntur-bank-app"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="firebase-sender-id">Messaging Sender ID</Label>
                    <Input
                      id="firebase-sender-id"
                      placeholder="123456789012"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="firebase-app-id">App ID</Label>
                    <Input
                      id="firebase-app-id"
                      placeholder="1:123456789012:web:abc123..."
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="firebase-measurement">Measurement ID (Analytics)</Label>
                    <Input
                      id="firebase-measurement"
                      placeholder="G-XXXXXXXXXX"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Firebase Authentication</p>
                      <p className="text-xs text-gray-600">Enable user authentication</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Cloud Firestore</p>
                      <p className="text-xs text-gray-600">Enable database service</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Security Settings</h3>
                  <p className="text-sm text-gray-600">Configure security and authentication</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-600">Require 2FA for admin login</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Force HTTPS</p>
                      <p className="text-xs text-gray-600">Redirect HTTP to HTTPS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Login Attempts Limit</p>
                      <p className="text-xs text-gray-600">Block after failed login attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      defaultValue="5"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      defaultValue="30"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">IP Whitelisting</p>
                      <p className="text-xs text-gray-600">Restrict admin access by IP</p>
                    </div>
                    <Switch />
                  </div>

                  <div>
                    <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                    <Textarea
                      id="allowed-ips"
                      placeholder="192.168.1.1&#10;10.0.0.1"
                      rows={3}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">One IP address per line</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Mail Settings */}
            {activeSection === 'mail' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Mail Configuration</h3>
                  <p className="text-sm text-gray-600">Configure email delivery settings</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mail-driver">Mail Driver</Label>
                    <select
                      id="mail-driver"
                      className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    >
                      <option>SMTP</option>
                      <option>SendGrid</option>
                      <option>Mailgun</option>
                      <option>AWS SES</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      placeholder="smtp.gmail.com"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input
                        id="smtp-port"
                        placeholder="587"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp-encryption">Encryption</Label>
                      <select
                        id="smtp-encryption"
                        className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                      >
                        <option>TLS</option>
                        <option>SSL</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input
                      id="smtp-username"
                      placeholder="gcubhelpdesk@guntururbanbank.org"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      placeholder="Enter password"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mail-from-address">From Address</Label>
                      <Input
                        id="mail-from-address"
                        type="email"
                        placeholder="noreply@guntururbanbank.org"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mail-from-name">From Name</Label>
                      <Input
                        id="mail-from-name"
                        placeholder="Guntur Urban Bank"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900">Test Email Configuration</p>
                        <p className="text-xs text-blue-700 mt-1">Send a test email to verify your settings</p>
                        <Button variant="outline" size="sm" className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
                          Send Test Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Social Settings */}
            {activeSection === 'social' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Social Media Links</h3>
                  <p className="text-sm text-gray-600">Configure social media profiles</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/guntururbanbank"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter">Twitter/X URL</Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/guntururbanbank"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/guntururbanbank"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/company/guntururbanbank"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youtube">YouTube URL</Label>
                    <Input
                      id="youtube"
                      placeholder="https://youtube.com/@guntururbanbank"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Show Social Icons</p>
                      <p className="text-xs text-gray-600">Display social media icons in footer</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Open Graph Tags</p>
                      <p className="text-xs text-gray-600">Enable social media preview cards</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeSection === 'seo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">SEO Configuration</h3>
                  <p className="text-sm text-gray-600">Optimize for search engines</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input
                      id="meta-title"
                      defaultValue="Guntur Urban Co-operative Bank - Banking Excellence Since 1981"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Recommended: 50-60 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      defaultValue="Trusted banking services in Guntur. We offer savings accounts, loans, deposits, and more financial solutions for our community."
                      rows={3}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Recommended: 150-160 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="meta-keywords">Meta Keywords</Label>
                    <Input
                      id="meta-keywords"
                      placeholder="bank, cooperative bank, guntur, savings, loans"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Comma separated keywords</p>
                  </div>

                  <div>
                    <Label htmlFor="og-image">Open Graph Image URL</Label>
                    <Input
                      id="og-image"
                      placeholder="https://guntururbanbank.org/og-image.jpg"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Recommended size: 1200x630px</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Auto-generate Sitemap</p>
                      <p className="text-xs text-gray-600">Automatically create XML sitemap</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Canonical URLs</p>
                      <p className="text-xs text-gray-600">Add canonical link tags</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Noindex, Nofollow</p>
                      <p className="text-xs text-gray-600">Prevent search engine indexing</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Robots Settings */}
            {activeSection === 'robots' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Robots.txt Configuration</h3>
                  <p className="text-sm text-gray-600">Control search engine crawlers</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Enable Robots.txt</p>
                      <p className="text-xs text-gray-600">Generate robots.txt file</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="robots-content">Robots.txt Content</Label>
                    <Textarea
                      id="robots-content"
                      defaultValue={`User-agent: *\nDisallow: /admin/\nDisallow: /private/\n\nSitemap: https://guntururbanbank.org/sitemap.xml`}
                      rows={10}
                      className="mt-1.5 font-mono text-sm"
                    />
                    <p className="text-xs text-gray-600 mt-1">Configure crawler access rules</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900">Default Rules Applied</p>
                        <p className="text-xs text-blue-700 mt-1">Admin and private directories are blocked by default</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Sitemap Settings */}
            {activeSection === 'sitemap' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Sitemap Configuration</h3>
                  <p className="text-sm text-gray-600">Manage XML sitemap settings</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Auto-generate Sitemap</p>
                      <p className="text-xs text-gray-600">Automatically create and update sitemap</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="sitemap-frequency">Update Frequency</Label>
                    <select
                      id="sitemap-frequency"
                      className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="sitemap-priority">Default Priority</Label>
                    <select
                      id="sitemap-priority"
                      className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    >
                      <option>1.0 (Highest)</option>
                      <option>0.8</option>
                      <option>0.5 (Medium)</option>
                      <option>0.3</option>
                      <option>0.1 (Lowest)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Include Images</p>
                      <p className="text-xs text-gray-600">Add image URLs to sitemap</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label>Exclude URLs (one per line)</Label>
                    <Textarea
                      placeholder="/admin&#10;/login&#10;/private"
                      rows={4}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <p className="text-sm text-green-900">Current Sitemap</p>
                        <p className="text-xs text-green-700 mt-1">https://guntururbanbank.org/sitemap.xml</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Webmaster Settings */}
            {activeSection === 'webmaster' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Webmaster Tools</h3>
                  <p className="text-sm text-gray-600">Verify site ownership for search engines</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="google-verification">Google Search Console</Label>
                    <Input
                      id="google-verification"
                      placeholder="Enter verification code"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Meta tag verification code</p>
                  </div>

                  <div>
                    <Label htmlFor="bing-verification">Bing Webmaster Tools</Label>
                    <Input
                      id="bing-verification"
                      placeholder="Enter verification code"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="yandex-verification">Yandex Webmaster</Label>
                    <Input
                      id="yandex-verification"
                      placeholder="Enter verification code"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pinterest-verification">Pinterest Verification</Label>
                    <Input
                      id="pinterest-verification"
                      placeholder="Enter verification code"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900">How to verify</p>
                        <p className="text-xs text-blue-700 mt-1">Get verification codes from respective webmaster tools and paste them here</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Analytics Settings */}
            {activeSection === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 mb-1">Analytics Integration</h3>
                  <p className="text-sm text-gray-600">Track website performance and user behavior</p>
                </div>
                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Enable Analytics</p>
                      <p className="text-xs text-gray-600">Track website visitors and behavior</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="ga-tracking">Google Analytics Tracking ID</Label>
                    <Input
                      id="ga-tracking"
                      placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                    <Input
                      id="gtm-id"
                      placeholder="GTM-XXXXXXX"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                    <Input
                      id="fb-pixel"
                      placeholder="Enter Facebook Pixel ID"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Cookie Consent</p>
                      <p className="text-xs text-gray-600">Show cookie consent banner</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Anonymize IP</p>
                      <p className="text-xs text-gray-600">Anonymize visitor IP addresses</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label htmlFor="custom-scripts">Custom Tracking Scripts</Label>
                    <Textarea
                      id="custom-scripts"
                      placeholder="<!-- Add custom analytics scripts here -->"
                      rows={6}
                      className="mt-1.5 font-mono text-sm"
                    />
                    <p className="text-xs text-gray-600 mt-1">Add custom tracking codes (will be inserted in &lt;head&gt;)</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900">Privacy Compliance</p>
                        <p className="text-xs text-blue-700 mt-1">Ensure your analytics setup complies with GDPR and local privacy laws</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="bg-[#0099ff] hover:bg-[#0088ee]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
