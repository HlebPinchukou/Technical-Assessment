import { useState, useEffect } from 'react';
import FileIcon from './icons/FileIcon.svg';
import DotsIcon from './icons/DotsIcon.svg';
import documentService from '../../services/DocumentService';

const DocumentsList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocumentsData = async () => {
            try {
                const response = await documentService.fetchDocuments();
                setDocuments(response.data.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocumentsData();
    }, []);

    const handleDocumentClick = (document) => {
        alert(`Document clicked: ${document.document_name}`);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="w-[100%]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Documents</h2>
                <a href="#" className="text-blue-600">View All Documents</a>
            </div>
            <div className="p-6 bg-white shadow rounded-lg w-[100%] h-[433px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-gray-500 font-semibold">Document Name</h2>
                    <a href="#" className="text-gray-500 font-semibold mr-[40px]">Received On</a>
                </div>
                <ul>
                    {documents.map((doc) => (
                        <li
                            key={doc.id}
                            className="flex justify-between items-center border-b py-4 cursor-pointer"
                            onClick={() => handleDocumentClick(doc)}
                        >
                            <div className="flex items-center">
                                <img src={FileIcon} alt="File" className="w-6 h-6 mr-[16px]" />
                                <p>{doc.document_name}</p>
                            </div>
                            <div className="flex flex-row justify-end items-center">
                                <p className="text-gray-500">{doc.updated_at ? new Date(doc.updated_at).toLocaleDateString() : 'N/A'}</p>
                                <img src={DotsIcon} alt="File" className="m-[16px]" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DocumentsList;
