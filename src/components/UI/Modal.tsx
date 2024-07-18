import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { createPortal } from "react-dom";
const Modal: React.FC = () => {
  const { isOpen, content } = useSelector((state: RootState) => state.modal);
  if (!isOpen) return null;
  return createPortal(
    <div className="flex justify-center">
      <div className="absolute overflow-y-auto top-0 md:top-20 flex items-center justify-center z-50">
        <div className="relative">{content}</div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
    </div>,
    document.body
  );
};

export default Modal;
