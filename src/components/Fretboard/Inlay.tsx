import { FC } from 'react';
import { useFretboardContext } from '../../contexts/FretboardContext';

const Inlay: FC = () => {
  const { inlayDiameter, inlayColor } = useFretboardContext();
  return (
    <div
      style={{
        position: 'absolute',
        width: inlayDiameter,
        height: inlayDiameter,
        backgroundColor: inlayColor,
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    ></div>
  );
};

export default Inlay;
