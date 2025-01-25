import React from "react";

type TileProps = {
  icon?: React.ElementType;
  title?: string;
  amount?: number;
  className?: string;
  children?: React.ReactNode;
  isDataVisible?: boolean;
};

const Tile: React.FC<TileProps> = ({
  icon: Icon,
  title,
  amount,
  className,
  children,
  isDataVisible,
}) => {
  return (
    <div
      className={`p-4 rounded-lg w-full flex gap-2 flex-col ${className}`}
      style={{
        boxShadow: "0 1px 9px 0 rgba(0, 0, 0, 0.09)",
      }}
    >
      {children ? (
        children
      ) : (
        <>
          {Icon && (
            <div>
              <Icon size={48} strokeWidth={1} className="text-second30" />
            </div>
          )}
          <div>
            {title && (
              <div className="text-black80 font-semibold text-body-sm">
                {isDataVisible ? title : "****"}
              </div>
            )}
            {amount !== undefined && (
              <div className="text-heading-3 text-black100">
                ${isDataVisible ? amount : "****"}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tile;
