import { useMemo } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useDragonImage = (name: string) => {
    const imageUrl = useMemo(() => {
        if (!name) return null;
        const formatted = name.replace(/ /g, '_');
        return `${API_BASE_URL}/images/${formatted}.webp`;
    }, [name]);

    return imageUrl;
};

export default useDragonImage;