import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import client from '../../api/client';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { DataTable, Column } from '../ui/DataTable';

interface DeafAccount {
  id: number;
  name: string;
  address: string;
  udrn: string;
}

export default function DeafAccountsManagement() {
  const [accounts, setAccounts] = useState<DeafAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await client.get('deaf-accounts');
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
        await client.post('deaf-accounts', formData);
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

  const columns: Column<DeafAccount>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      className: 'text-slate-500 w-[80px]'
    },
    {
      header: 'Name',
      cell: (account) => (
        <span className="font-bold text-slate-900">{account.name}</span>
      )
    },
    {
      header: 'UDRN',
      accessorKey: 'udrn',
      className: 'text-slate-600 font-medium'
    },
    {
      header: 'Address',
      cell: (account) => (
        <div className="max-w-xs truncate text-slate-500" title={account.address}>
          {account.address}
        </div>
      )
    },
    {
      header: 'Actions',
      headerClassName: 'text-right',
      className: 'text-right',
      cell: (account) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-[#0099ff] hover:bg-blue-50" onClick={() => handleEdit(account)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => handleDeleteClick(account.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {view === 'list' ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-2 mt-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 tracking-tighter leading-tight font-['Poppins']">Deaf Accounts</h2>
              <p className="text-sm text-gray-400 tracking-widest mt-1 mb-4">Operational protocol for specialized accounts</p>
            </div>
            <Button onClick={handleCreate} className="bg-[#0099ff] hover:bg-black text-sm font-semibold px-6 h-10 rounded-xl shadow-md uppercase tracking-[0.2em] transition-all duration-300 gap-2">
              <Plus className="h-4 w-4" /> Add Account
            </Button>
          </div>

          <DataTable
            data={accounts}
            columns={columns}
            isLoading={isLoading}
            searchPlaceholder="Search accounts..."
            emptyMessage="No accounts found."
          />
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => setView('list')} className="h-8 w-8 rounded-full hover:bg-slate-100 border border-slate-200">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">
                {editingAccount ? `Edit ${formData.name}` : 'Add New Account Holder'}
              </h2>
              <p className="text-xs text-slate-500">Configure account details and UDRN</p>
            </div>
          </div>

          <Card className="p-4 border-slate-200 rounded-xl max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter full name"
                    className="h-9 text-sm rounded-lg border-slate-200 focus-visible:ring-[#0099ff]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="udrn" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">UDRN</Label>
                  <Input
                    id="udrn"
                    value={formData.udrn}
                    onChange={(e) => setFormData({ ...formData, udrn: e.target.value })}
                    required
                    placeholder="Enter UDRN"
                    className="h-9 text-sm rounded-lg border-slate-200 focus-visible:ring-[#0099ff]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="Enter complete address"
                    rows={4}
                    className="min-h-[100px] text-sm rounded-lg border-slate-200 focus-visible:ring-[#0099ff] resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setView('list')} className="h-9 px-6 rounded-lg text-xs font-bold border-slate-200 text-slate-600">
                  CANCEL
                </Button>
                <Button type="submit" className="bg-[#0099ff] hover:bg-[#0077cc] h-9 px-8 rounded-lg text-xs font-bold tracking-wide shadow-lg shadow-blue-500/10">
                  <Save className="w-3.5 h-3.5 mr-2" />
                  {editingAccount ? 'UPDATE ACCOUNT' : 'SAVE ACCOUNT'}
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
