interface Application {
    id: number;
    application_id: string;
    application_type: 'deposit' | 'loan';
    product_id: number;
    product_name: string;
    branch_id: number;
    branch_name: string;
    name: string;
    email: string;
    phone: string;
    status: 'open' | 'in-progress' | 'approved' | 'rejected';
    notes: string | null;
    created_at: string;
    updated_at: string;
}

const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatStatus = (status: string): string => {
    return status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);
};

const escapeCSV = (value: string | null | undefined): string => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    // Escape double quotes and wrap in quotes if contains comma, quote, or newline
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

export const generateApplicationsCSV = (applications: Application[]): void => {
    // CSV Headers
    const headers = [
        'Application ID',
        'Type',
        'Product',
        'Branch',
        'Applicant Name',
        'Email',
        'Phone',
        'Status',
        'Notes',
        'Submitted Date',
        'Last Updated'
    ];

    // Convert applications to CSV rows
    const rows = applications.map(app => [
        escapeCSV(app.application_id),
        escapeCSV(app.application_type.charAt(0).toUpperCase() + app.application_type.slice(1)),
        escapeCSV(app.product_name),
        escapeCSV(app.branch_name || 'N/A'),
        escapeCSV(app.name),
        escapeCSV(app.email),
        escapeCSV(app.phone),
        escapeCSV(formatStatus(app.status)),
        escapeCSV(app.notes),
        escapeCSV(formatDate(app.created_at)),
        escapeCSV(formatDate(app.updated_at))
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};
