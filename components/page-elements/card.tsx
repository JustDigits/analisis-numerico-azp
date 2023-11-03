"use client";

interface CardProps {
  imgSrc: string;
  title: string;
}

export const Card: React.FC<CardProps> = ({ imgSrc, title }) => {
  return (
    <div className="w-96 m-4 p-4 border-[1px] border-solid shadow-lg rounded-xl">
      <div className="flex items-center justify-center h-[200px] my-3">
        <img src={imgSrc} alt={title} className="w-full h-auto" />
      </div>
      <h2 className="font-semibold text-center tracking-tight text-xl">
        {title}
      </h2>
    </div>
  );
};
