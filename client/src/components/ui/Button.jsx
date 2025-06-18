import React from "react";

export const Button = ({
  variant = "primary",
  onClick = () => {},
  children,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "flex items-center cursor-pointer px-3 py-2 rounded-md text-base font-medium";

  const variantStyles = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    secondary: "bg-green-600 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-emerald-500 text-emerald-500 hover:bg-emerald-100",
    link: "text-emerald-500 hover:text-emerald-600",
    ghost: "bg-transparent text-emerald-500 hover:bg-emerald-100",
  };

  const classes =
    `${baseStyles} ${variantStyles[variant]} ${className}` +
    (disabled ? " opacity-50 cursor-not-allowed" : "");
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
