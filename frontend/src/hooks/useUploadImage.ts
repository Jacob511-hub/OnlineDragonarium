import api from "../axios";

// Custom hook for uploading an image via the /upload post route
const useUploadImage = () => {
    const uploadImage = async (formData: FormData) => {
        try {
            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    return { uploadImage };
};

export default useUploadImage;