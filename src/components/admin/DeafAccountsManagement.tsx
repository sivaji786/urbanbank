import { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2, ArrowLeft, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import client from '../../api/client';
import { Textarea } from '../ui/textarea';

interface DeafAccount {
  id: number;
  name: string;
  address: string;
  udrn: string;
}

export default function DeafAccountsManagement() {
  const [accounts, setAccounts] = useState<DeafAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingAccount, setEditingAccount] = useState<DeafAccount | null>(null);
  const [formData, setFormData] = useState<Omit<DeafAccount, 'id'>>({
    name: '',
    address: '',
    udrn: ''
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await client.get('/deaf-accounts');
      setAccounts(response.data);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleCreate = () => {
    setEditingAccount(null);
    setFormData({ name: '', address: '', udrn: '' });
    setView('form');
  };

  const handleEdit = (account: DeafAccount) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      address: account.address,
      udrn: account.udrn
    });
    setView('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAccount) {
        await client.put(`/deaf-accounts/${editingAccount.id}`, formData);
      } else {
        await client.post('/deaf-accounts', formData);
      }
      setView('list');
      fetchAccounts();
    } catch (error) {
      console.error('Failed to save account', error);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmation({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.id) return;
    try {
      await client.delete(`/deaf-accounts/${deleteConfirmation.id}`);
      fetchAccounts();
    } catch (error) {
      console.error('Failed to delete account', error);
    } finally {
      setDeleteConfirmation({ isOpen: false, id: null });
    }
  };

  const filteredAccounts = accounts.filter((acc: DeafAccount) =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.udrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      {view === 'list' ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Deaf Accounts Management</h2>
              <p className="text-sm text-gray-500 mt-1">Manage the list of Deaf & Mute account holders.</p>
            </div>
            <Button onClick={handleCreate} className="bg-[#0099ff] hover:bg-[#0077cc]">
              <Plus className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-sm"
              />
            </div>

            <div className="relative w-full overflow-auto border rounded-md">
              <table className="w-full caption-bottom text-sm text-left">
                <thead className="[&_tr]:border-b bg-gray-50/50">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-10 px-4 align-middle font-medium text-gray-600">ID</th>
                    <th className="h-10 px-4 align-middle font-medium text-gray-600">Name</th>
                    <th className="h-10 px-4 align-middle font-medium text-gray-600">UDRN</th>
                    <th className="h-10 px-4 align-middle font-medium text-gray-600">Address</th>
                    <th className="h-10 px-4 align-middle font-medium text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0 text-gray-700">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">Loading...</td>
                    </tr>
                  ) : filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">No accounts found.</td>
                    </tr>
                  ) : (
                    paginatedAccounts.map((account: DeafAccount) => (
                      <tr key={account.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-2 align-middle">{account.id}</td>
                        <td className="p-2 align-middle font-medium text-gray-900">{account.name}</td>
                        <td className="p-2 align-middle">{account.udrn}</td>
                        <td className="p-2 align-middle max-w-xs truncate" title={account.address}>{account.address}</td>
                        <td className="p-2 align-middle text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-[#0099ff] hover:bg-blue-50" onClick={() => handleEdit(account)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDeleteClick(account.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredAccounts.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900">
                    {Math.min(currentPage * itemsPerPage, filteredAccounts.length)}
                  </span> of{' '}
                  <span className="font-semibold text-gray-900">{filteredAccounts.length}</span> entries
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-9 px-3"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show current page, first, last, and pages around current
                        return (
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1
                        );
                      })
                      .map((page, idx, array) => {
                        // Add dots
                        const showDots = idx > 0 && page - array[idx - 1] > 1;

                        return (
                          <div key={page} className="flex items-center">
                            {showDots && <span className="px-2 text-gray-400 text-xs">...</span>}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={`h-9 w-9 p-0 ${currentPage === page ? 'bg-[#0099ff] hover:bg-[#0077cc]' : ''}`}
                            >
                              {page}
                            </Button>
                          </div>
                        );
                      })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setView('list')} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">
              {editingAccount ? 'Edit Account Holder' : 'Add New Account Holder'}
            </h2>
          </div>

          <Card className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="udrn" className="text-gray-700">UDRN</Label>
                  <Input
                    id="udrn"
                    value={formData.udrn}
                    onChange={(e) => setFormData({ ...formData, udrn: e.target.value })}
                    required
                    placeholder="Enter UDRN"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="Enter complete address"
                    rows={4}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setView('list')}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc] min-w-[120px]">
                  <Save className="w-4 h-4 mr-2" />
                  {editingAccount ? 'Update Account' : 'Save Account'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Alert */}
      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(open: boolean) => setDeleteConfirmation((prev: any) => ({ ...prev, isOpen: open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the account holder from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}