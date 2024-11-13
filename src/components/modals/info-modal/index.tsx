import { createModal } from "react-modal-promise";
import { AssessmentHintItem } from "@/src/types/assesments/assesments.types";
import { Modal } from "@mui/material";
import { getSvgForTitle } from "../../../utils/svgUtils";
import CloseIcon from "../../../assets/icons/modal-close.svg?react";

interface Props {
    title: string;
    label?: string;
    hints: AssessmentHintItem[];
    isOpen: boolean;
    onResolve: () => void;
    onReject: () => void;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '24px',
        backgroundColor: '#fff', 
        overflow: 'auto',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 10000,
    }
};


const CModal = ({
    isOpen,
    onReject,
    title,
    hints,
}: Props) => {

    return (
        <Modal
            open={isOpen}
            onClose={onReject}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div style={customStyles.content} className="relative max-h-screen max-w-[90%] sm:max-w-[70%] md:max-w-[600px]">
                <button
                    onClick={onReject}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 group"
                >
                    <CloseIcon className="group-hover:filter group-hover:brightness-[80%]" />
                </button>
                <div className="flex justify-between items-center border-b border-[#f4f4f4] p-4 sm:p-6">
                    <h4 className="flex items-center text-[14px] font-semibold sm:text-[24px]">
                        {getSvgForTitle(title)}
                        {title}
                    </h4>
                </div>
                <ul className="space-y-3  p-4 sm:p-6">
                    {hints.map((hintItem, index) => (
                        <li key={index}>
                            <h3 className="text-[14px] font-medium text-app-grey-100 mb-0.5 sm:text-[18px]">{hintItem.label}</h3>
                            <p className="text-[14px] text-app-default-font sm:text-[16px]">{hintItem.hint}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const openInfoModal = createModal<CModalProps>(CModal);

export default openInfoModal;