import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ImageDisplay from './components/ImageDisplay';
import './App.css';

function App() {
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');

    return (
        <div>
            <UploadForm setImageUrl={setImageUrl} setLink={setLink} />
            <ImageDisplay imageUrl={imageUrl} link={link} />
        </div>
    );
}

export default App;
