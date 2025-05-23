import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const AddRoom = () => {
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });
    
    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
        }
    });

    // Cache le footer lors du montage du composant
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (footer) footer.style.display = 'none';
        
        return () => {
            if (footer) footer.style.display = 'block';
        };
    }, []);

    const handleImageChange = (key, e) => {
        setImages({
            ...images,
            [key]: e.target.files[0]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handleAmenityChange = (amenity) => {
        setInputs({
            ...inputs,
            amenities: {
                ...inputs.amenities,
                [amenity]: !inputs.amenities[amenity]
            }
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <form className="space-y-6">
                {/* Header Section */}
                <Title
                    align="left"
                    font="outfit"
                    title="Add Room"
                    subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
                />

                {/* Images Upload Section */}
                <div className="space-y-2">
                    <p className="text-gray-800">Images</p>
                    <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
                        {Object.keys(images).map((key) => (
                            <label 
                                htmlFor={`roomImages${key}`} 
                                key={key}
                                className="cursor-pointer"
                            >
                                <img 
                                    className="max-h-[52px] opacity-80 hover:opacity-100 transition-opacity"
                                    src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} 
                                    alt={`Preview ${key}`} 
                                />
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id={`roomImages${key}`} 
                                    className="hidden"
                                    onChange={(e) => handleImageChange(key, e)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Room Details Section */}
                <div className="space-y-4">
                    {/* Room Type */}
                    <div className="w-full flex-1 max-sm:flex-col sm:gap-4">
                        <div className="flex-1 max-w-48">
                            <p className="text-gray-800">Room Type:</p>
                            <select 
                                value={inputs.roomType} 
                                onChange={handleInputChange}
                                name="roomType"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            >
                                <option value="">Select Room Type</option>
                                <option value="Single Bed">Single Bed</option>
                                <option value="Double Bed">Double Bed</option>
                                <option value="Luxury Room">Luxury Room</option>
                                <option value="Family Suite">Family Suite</option>
                            </select>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <p className="text-gray-800">Price (<span className="text-xs">/night</span>)</p>
                        <input 
                            type="number" 
                            placeholder="0" 
                            className="border border-gray-300 rounded p-2 w-24 mt-1"
                            value={inputs.pricePerNight}
                            onChange={handleInputChange}
                            name="pricePerNight"
                        />
                    </div>

                    {/* Amenities */}
                    <div>
                        <p className="text-gray-800 mt-4">Amenities:</p>
                        <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
                            {Object.keys(inputs.amenities).map((amenity, index) => (
                                <div key={amenity} className="flex items-center gap-2">
                                    <input 
                                        type="checkbox" 
                                        id={`amenities${index + 1}`} 
                                        checked={inputs.amenities[amenity]} 
                                        onChange={() => handleAmenityChange(amenity)} 
                                    />
                                    <label htmlFor={`amenities${index + 1}`}>{amenity}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="bg-primary text-white px-8 py-2 rounded mt-8 hover:bg-primary-dark transition-colors"
                >
                    Add Room
                </button>
            </form>
        </div>
    );
};

export default AddRoom;