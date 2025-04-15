import React from "react";

interface AdminElementButtonProps {
    src: string;
    id: number;
    onClick: (id: number) => void;
}

const AdminElementButton: React.FC<AdminElementButtonProps> = ({ src, id, onClick }) => {
    const handleClick = () => {
      onClick(id);
    };

    return (
        <div
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <img src={src} />
        </div>
      );
};

export default AdminElementButton;