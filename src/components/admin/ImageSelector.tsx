import { useState, useEffect, useRef } from 'react';
import { Folder, ChevronLeft, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '../ui/dialog';
import client from '../../api/client';

interface FileItem {
    name: string;
    type: 'file' | 'directory';
    path: string;
    url: string | null;
}

interface ImageSelectorProps {
    onSelect: (url: string) => void;
    onCancel: () => void;
}

export function ImageSelector({ onSelect, onCancel }: ImageSelectorProps) {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [currentPath, setCurrentPath] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchFiles(currentPath);
    }, [currentPath]);

    const fetchFiles = async (path: string) => {
        setIsLoading(true);
        try {
            const response = await client.get(`/uploads`, {
                params: { path }
            });
            setFiles(response.data);
        } catch (error) {
            console.error('Failed to fetch files', error);
        }
        setIsLoading(false);
    };

    const handleNavigate = (path: string) => {
        setCurrentPath(path);
    };

    const handleBack = () => {
        const parts = currentPath.split('/');
        parts.pop();
        setCurrentPath(parts.join('/'));
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.');
            return;
        }

        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size exceeds 2MB limit.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', currentPath);

        try {
            await client.post('/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchFiles(currentPath);
        } catch (error) {
            console.error('Failed to upload file', error);
            alert('Failed to upload file');
        }
        setIsUploading(false);
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCreateFolder = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newFolderName) return;

        try {
            await client.post('/uploads/create-folder', {
                path: currentPath,
                name: newFolderName
            });
            fetchFiles(currentPath);
            setNewFolderName('');
            setIsNewFolderDialogOpen(false);
        } catch (error) {
            console.error('Failed to create folder', error);
            alert('Failed to create folder');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {currentPath && (
                        <Button variant="ghost" size="icon" onClick={handleBack}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                    )}
                    <h3 className="font-medium">
                        {currentPath ? currentPath : 'Uploads'}
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500">
                        Uploading to: /{currentPath || 'root'}
                    </span>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/png, image/jpeg, image/gif, image/webp"
                        onChange={handleFileChange}
                    />
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsNewFolderDialogOpen(true)}
                        >
                            <Folder className="w-4 h-4 mr-2" />
                            New Folder
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleUploadClick}
                            disabled={isUploading}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {isUploading ? 'Uploading...' : 'Upload Image'}
                        </Button>
                    </div>
                </div>
            </div>

            <ScrollArea className="h-[400px] border rounded-md p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        Loading...
                    </div>
                ) : files.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No files found
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {files.map((file) => (
                            <div
                                key={file.name}
                                className="cursor-pointer group"
                                onClick={() => {
                                    if (file.type === 'directory') {
                                        handleNavigate(file.path);
                                    } else {
                                        if (file.url) onSelect(file.url);
                                    }
                                }}
                            >
                                <div className="aspect-square rounded-lg border bg-gray-50 flex items-center justify-center overflow-hidden hover:border-blue-500 transition-colors">
                                    {file.type === 'directory' ? (
                                        <Folder className="w-12 h-12 text-gray-400 group-hover:text-blue-500" />
                                    ) : (
                                        <img
                                            src={file.url!}
                                            alt={file.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-center truncate px-1">
                                    {file.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>

            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
            </div>

            <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                        <DialogDescription>
                            Enter a name for the new folder to organize your images.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateFolder} className="space-y-4">
                        <div>
                            <Label htmlFor="folderName">Folder Name</Label>
                            <Input
                                id="folderName"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                placeholder="Enter folder name"
                                className="mt-1"
                                autoFocus
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!newFolderName.trim()}>
                                Create Folder
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
