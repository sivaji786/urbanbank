import { useState, useEffect } from 'react';
import {
  Settings,
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
import { useSettings } from '../../contexts/SettingsContext';
import client from '../../api/client';

type SettingsSection =
  | 'general'
  | 'seo'
  | 'robots'
  | 'sitemap'
  | 'webmaster'
  | 'analytics';

export function SettingsManagement() {
  const { refreshSettings } = useSettings();
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
      await refreshSettings();
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

  return (
    <div className="space-y-4">
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
      <div className="grid grid-cols-12 gap-4">
        {/* Settings Menu */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="p-3">
            <nav className="space-y-1">
              {[
                { id: 'general' as SettingsSection, label: 'General', icon: Settings },
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
          <Card className="p-5">
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
                    <Label htmlFor="site_tagline">Tagline</Label>
                    <Input
                      id="site_tagline"
                      value={settings.site_tagline || ''}
                      onChange={(e) => updateSetting('site_tagline', e.target.value)}
                      placeholder="e.g. Banking Excellence Since 1981"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="domain_name">Domain Name</Label>
                    <Input
                      id="domain_name"
                      value={settings.domain_name || ''}
                      onChange={(e) => updateSetting('domain_name', e.target.value)}
                      placeholder="e.g. https://guntururbanbank.org"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Full URL including https:// (used for Canonical and Sitemap)</p>
                  </div>

                  <div>
                    <Label htmlFor="site_description">Site Description</Label>
                    <Textarea
                      id="site_description"
                      value={settings.site_description || ''}
                      onChange={(e) => updateSetting('site_description', e.target.value)}
                      placeholder="Describe your bank..."
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

                  <div>
                    <Label htmlFor="visitor_count_offset">Visitor Count Offset</Label>
                    <Input
                      id="visitor_count_offset"
                      type="number"
                      value={settings.visitor_count_offset || 0}
                      onChange={(e) => updateSetting('visitor_count_offset', parseInt(e.target.value) || 0)}
                      placeholder="e.g. 125326"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-muted-foreground mt-1">This number will be added to actual site visits for the total count displayed in footer.</p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Maintenance Mode</p>
                      <p className="text-xs text-gray-600">Temporarily disable the website</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Registration</p>
                      <p className="text-xs text-gray-600">Allow new user registration</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
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
                      value={settings.meta_title || ''}
                      onChange={(e) => updateSetting('meta_title', e.target.value)}
                      placeholder="Guntur Urban Co-operative Bank - Banking Excellence Since 1981"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Recommended: 50-60 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={settings.meta_description_seo || ''}
                      onChange={(e) => updateSetting('meta_description_seo', e.target.value)}
                      placeholder="Trusted banking services in Guntur. We offer savings accounts, loans, deposits, and more financial solutions for our community."
                      rows={3}
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Recommended: 150-160 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="meta-keywords">Meta Keywords</Label>
                    <Input
                      id="meta-keywords"
                      value={settings.meta_keywords || ''}
                      onChange={(e) => updateSetting('meta_keywords', e.target.value)}
                      placeholder="bank, cooperative bank, guntur, savings, loans"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Comma separated keywords</p>
                  </div>

                  <div>
                    <Label htmlFor="og-image">Open Graph Image URL</Label>
                    <Input
                      id="og-image"
                      value={settings.og_image || ''}
                      onChange={(e) => updateSetting('og_image', e.target.value)}
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
                    <Switch
                      checked={settings.sitemap_auto === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('sitemap_auto', checked ? '1' : '0')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Canonical URLs</p>
                      <p className="text-xs text-gray-600">Add canonical link tags</p>
                    </div>
                    <Switch
                      checked={settings.canonical_enabled === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('canonical_enabled', checked ? '1' : '0')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Noindex, Nofollow</p>
                      <p className="text-xs text-gray-600">Prevent search engine indexing</p>
                    </div>
                    <Switch
                      checked={settings.noindex_enabled === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('noindex_enabled', checked ? '1' : '0')}
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
                    <Switch
                      checked={settings.robots_enabled === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('robots_enabled', checked ? '1' : '0')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="robots-content">Robots.txt Content</Label>
                    <Textarea
                      id="robots-content"
                      value={settings.robots_content || `User-agent: *\nDisallow: /admin/\nDisallow: /private/\n\nSitemap: ${settings.domain_name || 'https://guntururbanbank.org'}/sitemap.xml`}
                      onChange={(e) => updateSetting('robots_content', e.target.value)}
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
                      <p className="text-sm text-gray-900">Enable Sitemap</p>
                      <p className="text-xs text-gray-600">Automatically create and update sitemap</p>
                    </div>
                    <Switch
                      checked={settings.sitemap_enabled === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('sitemap_enabled', checked ? '1' : '0')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sitemap-frequency">Update Frequency</Label>
                    <select
                      id="sitemap-frequency"
                      value={settings.sitemap_frequency || 'Weekly'}
                      onChange={(e) => updateSetting('sitemap_frequency', e.target.value)}
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
                      value={settings.sitemap_priority || '0.5'}
                      onChange={(e) => updateSetting('sitemap_priority', e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
                    >
                      <option value="1.0">1.0 (Highest)</option>
                      <option value="0.8">0.8</option>
                      <option value="0.5">0.5 (Medium)</option>
                      <option value="0.3">0.3</option>
                      <option value="0.1">0.1 (Lowest)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Include Images</p>
                      <p className="text-xs text-gray-600">Add image URLs to sitemap</p>
                    </div>
                    <Switch
                      checked={settings.sitemap_include_images === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('sitemap_include_images', checked ? '1' : '0')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sitemap-exclude">Exclude URLs (one per line)</Label>
                    <Textarea
                      id="sitemap-exclude"
                      value={settings.sitemap_exclude || ''}
                      onChange={(e) => updateSetting('sitemap_exclude', e.target.value)}
                      placeholder="/admin&#10;/login&#10;/private"
                      rows={4}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex gap-3 items-start">
                      <div className="flex-1">
                        <p className="text-sm text-green-900">Current Sitemap</p>
                        <p className="text-xs text-green-700 mt-1">{settings.domain_name || 'https://guntururbanbank.org'}/sitemap.xml</p>
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
                      value={settings.google_verification || ''}
                      onChange={(e) => updateSetting('google_verification', e.target.value)}
                      placeholder="Enter verification code"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">Meta tag verification code</p>
                  </div>

                  <div>
                    <Label htmlFor="bing-verification">Bing Webmaster Tools</Label>
                    <Input
                      id="bing-verification"
                      value={settings.bing_verification || ''}
                      onChange={(e) => updateSetting('bing_verification', e.target.value)}
                      placeholder="Enter verification code"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="yandex-verification">Yandex Webmaster</Label>
                    <Input
                      id="yandex-verification"
                      value={settings.yandex_verification || ''}
                      onChange={(e) => updateSetting('yandex_verification', e.target.value)}
                      placeholder="Enter verification code"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pinterest-verification">Pinterest Verification</Label>
                    <Input
                      id="pinterest-verification"
                      value={settings.pinterest_verification || ''}
                      onChange={(e) => updateSetting('pinterest_verification', e.target.value)}
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
                    <Switch
                      checked={settings.analytics_enabled === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('analytics_enabled', checked ? '1' : '0')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="ga-tracking">Google Analytics Tracking ID</Label>
                    <Input
                      id="ga-tracking"
                      value={settings.ga_tracking_id || ''}
                      onChange={(e) => updateSetting('ga_tracking_id', e.target.value)}
                      placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
                    <Input
                      id="gtm-id"
                      value={settings.gtm_id || ''}
                      onChange={(e) => updateSetting('gtm_id', e.target.value)}
                      placeholder="GTM-XXXXXXX"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fb-pixel">Facebook Pixel ID</Label>
                    <Input
                      id="fb-pixel"
                      value={settings.fb_pixel_id || ''}
                      onChange={(e) => updateSetting('fb_pixel_id', e.target.value)}
                      placeholder="Enter Facebook Pixel ID"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Cookie Consent</p>
                      <p className="text-xs text-gray-600">Show cookie consent banner</p>
                    </div>
                    <Switch
                      checked={settings.cookie_consent_enabled === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('cookie_consent_enabled', checked ? '1' : '0')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Anonymize IP</p>
                      <p className="text-xs text-gray-600">Anonymize visitor IP addresses</p>
                    </div>
                    <Switch
                      checked={settings.anonymize_ip === '1'}
                      onCheckedChange={(checked: boolean) => updateSetting('anonymize_ip', checked ? '1' : '0')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="custom-scripts">Custom Tracking Scripts</Label>
                    <Textarea
                      id="custom-scripts"
                      value={settings.custom_scripts || ''}
                      onChange={(e) => updateSetting('custom_scripts', e.target.value)}
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
