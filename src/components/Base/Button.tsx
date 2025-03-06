import { FC, PropsWithChildren } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';

type Props = {
  className?: string;
  onClick?: () => unknown;
};

const Button: FC<PropsWithChildren<Props>> = ({
  onClick = () => {},
  className,
  children,
}) => {
  return (
    <HeadlessButton
      className={`cursor-pointer font-playfair-display border-1 border-black hover:bg-gray-100 px-2 ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      {children}
    </HeadlessButton>
  );
};

export default Button;
