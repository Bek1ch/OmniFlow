import React, { forwardRef } from "react";
import "./Input.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helper?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "borderless";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      size = "md",
      variant = "default",
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      isLoading = false,
      fullWidth = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    const inputClasses = [
      "input",
      `input--${size}`,
      `input--${variant}`,
      hasError ? "input--error" : "",
      leftIcon || leftAddon ? "input--with-left" : "",
      rightIcon || rightAddon || isLoading ? "input--with-right" : "",
      fullWidth ? "input--full-width" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const wrapperClasses = [
      "input-wrapper",
      fullWidth ? "input-wrapper--full-width" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="input__label">
            {label}
          </label>
        )}

        <div className="input__container">
          {leftAddon && (
            <div className="input__addon input__addon--left">{leftAddon}</div>
          )}

          {leftIcon && (
            <div className="input__icon input__icon--left">{leftIcon}</div>
          )}

          <input ref={ref} id={inputId} className={inputClasses} {...props} />

          {isLoading && (
            <div className="input__icon input__icon--right">
              <div className="input__spinner" />
            </div>
          )}

          {!isLoading && rightIcon && (
            <div className="input__icon input__icon--right">{rightIcon}</div>
          )}

          {rightAddon && (
            <div className="input__addon input__addon--right">{rightAddon}</div>
          )}
        </div>

        {(error || helper) && (
          <div className="input__message">
            {error ? (
              <span className="input__error">{error}</span>
            ) : (
              <span className="input__helper">{helper}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
