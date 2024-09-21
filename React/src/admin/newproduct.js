import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert'; // Import SweetAlert

const NewProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState(''); // Add description field
    const [productTitle, setProductTitle] = useState(''); // Add title field
    const [productPrice, setProductPrice] = useState('');
    const [productOffer, setProductOffer] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([null, null, null, null]); // Changed to 4 images
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e, index) => {
        const files = e.target.files;
        if (files.length > 0) {
            const newImages = [...images];
            newImages[index] = files[0];
            setImages(newImages);
        }
    };

    const handleUpload = async () => {
        if (!productName || !productPrice || !productDescription || !productTitle || !productOffer || !quantity) {
            alert('Please fill all product fields.');
            return;
        }

        // Validate at least 2 images are uploaded
        const uploadedImages = images.filter(img => img !== null);
        if (uploadedImages.length < 2) {
            alert('Please upload at least 2 images.');
            return;
        }

        const cloudName = 'dvwetmdiv';  // Replace with your Cloudinary cloud name
        const uploadPreset = 'ml_default';  // Replace with your upload preset
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        setLoading(true);

        try {
            const uploadedUrls = [];
            for (let i = 0; i < uploadedImages.length; i++) {
                const formData = new FormData();
                formData.append('file', uploadedImages[i]);
                formData.append('upload_preset', uploadPreset);

                const response = await axios.post(uploadUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                uploadedUrls.push(response.data.secure_url);
            }

            setUploadedUrls(uploadedUrls);
            setLoading(false);

            // Submit product data to backend after successful image upload
            await handleSubmit(uploadedUrls);
        } catch (error) {
            console.error('Upload error:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (imageUrls) => {
        const productData = {
            name: productName,
            description: productDescription,
            title: productTitle,
            qty: quantity,
            price: productPrice,
            discount: productOffer,
            pic1: imageUrls[0] || null,
            pic2: imageUrls[1] || null,
            pic3: imageUrls[2] || null,
            pic4: imageUrls[3] || null,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/items/', productData);

            
            if (response.status === 200) {
                // Show success alert
                swal("Success!", "Product created successfully!", "success");

                // Clear form after submission
                setProductName('');
                setProductDescription(''); // Clear description
                setProductTitle(''); // Clear title
                setProductPrice('');
                setProductOffer('');
                setQuantity('');
                setImages([null, null, null, null]); // Reset to 4 images
                setUploadedUrls([]);
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            alert('Failed to create product.');
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Upload Product Details</h2>

            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Product Title"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <textarea
                    className="form-control"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Product Offer"
                    value={productOffer}
                    onChange={(e) => setProductOffer(e.target.value)}
                />
            </div>

            <div className="form-group mb-3">
                <h3>Upload 4 Product Images</h3>
                <div className="d-flex flex-column">
                    {[...Array(4)].map((_, index) => (
                        <input
                            key={index}
                            type="file"
                            className="form-control mb-2"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, index)}
                        />
                    ))}
                </div>
            </div>

            <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={loading}
            >
                {loading ? 'Uploading...' : 'Upload Images and Submit Product'}
            </button>

            {uploadedUrls.length > 0 && (
                <div className="mt-4">
                    <h3>Uploaded Images</h3>
                    <div className="d-flex flex-wrap">
                        {uploadedUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                style={{ width: '150px', height: '150px', margin: '10px' }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewProduct;