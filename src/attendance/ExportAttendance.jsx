import React, { useState } from 'react';
import axios from 'axios';

const ExportAttendance = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleExport = () => {
        axios.get(`http://localhost:3000/exportAttendance/${startDate}/${endDate}`, {
            responseType: 'blob' // expect binary data
        })
        .then(response => {
            // Create  element
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'attendance.xlsx'); 
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link); 
        })
        .catch(error => {
            console.error('Error exporting attendance:', error);
            
        });
    };

    return (
        <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
            <div className=" ">
                <h1 className="text-2xl font-bold mb-4 text-center">Export Attendance</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Start Date</label>
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">End Date</label>
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={e => setEndDate(e.target.value)} 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <button 
                    onClick={handleExport} 
                    className=" bg-green-600 text-white px-4 py-2 rounded-md text-center flex justify-center items-center m-auto"
                >
                    Export Attendance
                </button>
            </div>
        </div>
    );
};

export default ExportAttendance;
