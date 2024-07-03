import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ setImageUrl, setLink }) => {
    const [photo, setPhoto] = useState(null);
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('link', url);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setImageUrl(response.data.imageUrl);
            setLink(url);
        } catch (error) {
            console.error('Error uploading photo', error);
        }
    };

    return (
        <div className="overlay">
            <h1 className="title">Upload Your Ad</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter link" required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadForm;
