import { FC, PropsWithChildren } from 'react';

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
};

const Text: FC<PropsWithChildren<Props>> = ({
  children,
  variant = 'p',
  as,
  className = '',
}) => {
  const Tag = as ?? 'p';
  return <Tag className={`font-playfair-display ${className}`}>{children}</Tag>;
};

export default Text;
