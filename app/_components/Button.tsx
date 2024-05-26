import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={classNames(
        'bg-cyan-700 w-32 h-9 text-white rounded',
        className,
      )}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
