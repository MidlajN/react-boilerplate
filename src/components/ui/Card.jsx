import React, { useState } from "react";
import cn from "../../utils/cn";
import { Button } from "./button";

export const Card = ({
  variant = "default",
  image, // optional image for default card
  title,
  description,
  buttonText,
  buttonOnClick,
  showLikeButton = false,
  initialLikes = 0,
  className,
  icon,
  ...props
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));
  };

  const baseStyle = "rounded-xl shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden";
  const variants = {
    default: "bg-white",
    highlight: "bg-indigo-50 border border-indigo-200",
    outline: "bg-white border border-gray-200 hover:border-indigo-300",
    imageOverlay: "relative h-64 md:h-80 flex flex-col justify-end text-white",
  };

  // Image overlay variant
  if (variant === "imageOverlay") {
    return (
      <div
        className={cn(baseStyle, variants[variant], className)}
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative p-6 flex flex-col gap-2">
          {title && <h3 className="text-xl font-bold">{title}</h3>}
          {description && <p className="text-sm text-gray-100">{description}</p>}
          {buttonText && buttonOnClick && (
            <div className="mt-2">
              <Button onClick={buttonOnClick} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default / Highlight / Outline variant
  return (
    <div className={cn(baseStyle, variants[variant], className)} {...props}>
      {image && (
        <img
          src={image}
          alt="Card Image"
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />
      )}

      {icon && !image && (
        <div className="text-4xl mb-3 flex justify-center">{icon}</div>
      )}

      {title && <h3 className="font-semibold text-lg mb-2 px-4">{title}</h3>}
      {description && <p className="text-gray-600 text-sm mb-3 px-4">{description}</p>}

      <div className="flex items-end justify-between mb-auto">
        {buttonText && buttonOnClick && (
          <div className="mb-4 px-4 ">
            <Button onClick={buttonOnClick} className="bg-indigo-600 hover:bg-indigo-500 text-white">
              {buttonText}
            </Button>
          </div>
        )}

        {showLikeButton && (
          <div className="mb-3 mx-3 flex items-center justify-end gap-2">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-all",
                liked
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <span className={`transition-transform ${liked ? "scale-125" : ""}`}>❤️</span>
              {likes}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
