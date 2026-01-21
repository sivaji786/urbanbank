import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

interface StatusLog {
    id: number;
    application_id: number;
    old_status: string | null;
    new_status: string;
    notes: string | null;
    changed_by: number | null;
    created_at: string;
}

export const generateApplicationPDF = (application: Application, statusLogs: StatusLog[]) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 153, 255); // #0099ff
    doc.text('Application Details', 14, 20);

    // Application Information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Application Information', 14, 35);

    doc.setFontSize(10);
    const appInfo = [
        ['Application ID', application.application_id],
        ['Type', application.application_type.charAt(0).toUpperCase() + application.application_type.slice(1)],
        ['Product', application.product_name],
        ['Branch', application.branch_name || 'N/A'],
        ['Status', application.status === 'in-progress' ? 'In Progress' : application.status.charAt(0).toUpperCase() + application.status.slice(1)],
        ['Submitted On', new Date(application.created_at).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })]
    ];

    autoTable(doc, {
        startY: 40,
        head: [],
        body: appInfo,
        theme: 'plain',
        styles: { fontSize: 10 },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 40 },
            1: { cellWidth: 'auto' }
        }
    });

    // Applicant Information
    const yPos = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Applicant Information', 14, yPos);

    const applicantInfo = [
        ['Name', application.name],
        ['Email', application.email],
        ['Phone', application.phone]
    ];

    autoTable(doc, {
        startY: yPos + 5,
        head: [],
        body: applicantInfo,
        theme: 'plain',
        styles: { fontSize: 10 },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 40 },
            1: { cellWidth: 'auto' }
        }
    });

    // Status History
    const historyYPos = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Status History', 14, historyYPos);

    if (statusLogs.length === 0) {
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text('No status changes recorded yet', 14, historyYPos + 10);
    } else {
        const historyData = statusLogs.map(log => [
            log.old_status ?
                (log.old_status === 'in-progress' ? 'In Progress' : log.old_status.charAt(0).toUpperCase() + log.old_status.slice(1))
                : 'Initial',
            log.new_status === 'in-progress' ? 'In Progress' : log.new_status.charAt(0).toUpperCase() + log.new_status.slice(1),
            log.notes || '-',
            new Date(log.created_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        ]);

        autoTable(doc, {
            startY: historyYPos + 5,
            head: [['From Status', 'To Status', 'Notes', 'Date']],
            body: historyData,
            theme: 'striped',
            headStyles: { fillColor: [0, 153, 255], textColor: 255 },
            styles: { fontSize: 9 },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 30 },
                2: { cellWidth: 80 },
                3: { cellWidth: 45 }
            }
        });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
            `Generated on ${new Date().toLocaleDateString('en-IN')} - Page ${i} of ${pageCount}`,
            14,
            doc.internal.pageSize.height - 10
        );
    }

    // Save the PDF
    doc.save(`Application_${application.application_id}.pdf`);
};
