import { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import client from '../../api/client';

interface Page {
    id: number;
    slug: string;
    title: string;
    content: any;
}

export function PageManager() {
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPageSlug, setSelectedPageSlug] = useState<string>('');
    const [jsonContent, setJsonContent] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchPages();
    }, []);

    useEffect(() => {
        if (selectedPageSlug) {
            fetchPageContent(selectedPageSlug);
        } else {
            setJsonContent('');
        }
    }, [selectedPageSlug]);

    const fetchPages = async () => {
        try {
            const response = await client.get('/pages');
            setPages(response.data);
        } catch (err) {
            console.error('Failed to fetch pages', err);
            setError('Failed to load pages list.');
        }
    };

    const fetchPageContent = async (slug: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await client.get(`/pages/${slug}`);
            let content = response.data.content;

            // Ensure we have a string for the textarea
            if (typeof content !== 'string') {
                content = JSON.stringify(content, null, 2);
            } else {
                // If it's already a string, try to format it if it's valid JSON
                try {
                    const parsed = JSON.parse(content);
                    content = JSON.stringify(parsed, null, 2);
                } catch (e) {
                    // Leave as is if not valid JSON
                }
            }

            setJsonContent(content);
        } catch (err) {
            console.error('Failed to fetch page content', err);
            setError('Failed to load page content.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            // Validate JSON
            let parsedContent;
            try {
                parsedContent = JSON.parse(jsonContent);
            } catch (e) {
                setError('Invalid JSON format. Please correct the errors.');
                setSaving(false);
                return;
            }

            const page = pages.find(p => p.slug === selectedPageSlug);
            if (!page) return;

            await client.put(`/pages/${page.id}`, {
                slug: page.slug,
                title: page.title,
                content: parsedContent // Send as object, axios will stringify
            });

            setSuccess('Page content updated successfully.');
        } catch (err) {
            console.error('Failed to save page content', err);
            setError('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Page Content Manager</h2>
            </div>

            <Card className="p-6">
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="page-select">Select Page</Label>
                        <Select value={selectedPageSlug} onValueChange={setSelectedPageSlug}>
                            <SelectTrigger className="w-full md:w-[300px]">
                                <SelectValue placeholder="Choose a page to edit..." />
                            </SelectTrigger>
                            <SelectContent>
                                {pages.map((page) => (
                                    <SelectItem key={page.id} value={page.slug}>
                                        {page.title} ({page.slug})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedPageSlug === 'management' && (
                        <Alert className="bg-blue-50 text-blue-900 border-blue-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Managing Team Members</AlertTitle>
                            <AlertDescription>
                                This section allows you to edit the page titles and configure role names.
                                <br />
                                <strong>To add, edit, or remove team members (including their images), please go to the "Team Members" section in the sidebar.</strong>
                            </AlertDescription>
                        </Alert>
                    )}

                    {selectedPageSlug && (
                        <>
                            {loading ? (
                                <div className="text-center py-8">Loading content...</div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="json-editor">Content (JSON)</Label>
                                        <div className="text-xs text-gray-500 mb-2">
                                            Edit the raw JSON content below. Be careful with syntax.
                                        </div>
                                        <Textarea
                                            id="json-editor"
                                            value={jsonContent}
                                            onChange={(e) => setJsonContent(e.target.value)}
                                            className="font-mono h-[500px]"
                                        />
                                    </div>

                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}

                                    {success && (
                                        <Alert className="bg-green-50 text-green-900 border-green-200">
                                            <AlertDescription>{success}</AlertDescription>
                                        </Alert>
                                    )}

                                    <div className="flex justify-end">
                                        <Button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="bg-[#0099ff] hover:bg-[#0077cc]"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {saving ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}
