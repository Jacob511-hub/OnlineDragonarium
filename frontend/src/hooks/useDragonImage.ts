import { useMemo } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useDragonImage = (id: number) => {
    const imageUrl = useMemo(() => {
        if (!id) return null;
        return `${API_BASE_URL}/dragons/${id}/image`;
    }, [id]);

    return imageUrl;
};

export default useDragonImage;