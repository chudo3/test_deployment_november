import { createModal } from "react-modal-promise";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Modal from 'react-modal';
import Button from "@/src/components/common/button";
import CloseIcon from "../../../assets/icons/modal-close.svg?react";

interface Props {
    title: string;
    label?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    isOpen: boolean;
    onResolve: () => void;
    onReject: () => void;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '90%',           
        maxWidth: '500px',
        borderRadius: '24px',
        padding: '16px',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.7)',  
        zIndex: 9000,
    },
};

const CModal = ({
    isOpen,
    onResolve,
    onReject,
    confirmButtonText,
    cancelButtonText,
    title,
    label
}: Props) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onReject}
        ariaHideApp={false}
        style={customStyles} 
    >
        <div className="bg-white sm:p-1.5">
            <h3 className="font-medium text-[16px] text-app-grey-100 pr-6 sm:text-[18px]">{title}</h3>
            <p className="text-app-default-font text-[14px] mt-1 sm:text-[16px]">{label}</p>
            <button
                    onClick={onReject}
                    className="absolute top-2 right-2 group sm:top-3 sm:right-3"
                >
                    <CloseIcon className="group-hover:filter group-hover:brightness-[80%]" />
            </button>
            <div className="mt-5 flex flex-col-reverse gap-2 items-center text-[14px] justify-center sm:gap-3 sm:flex-row sm:text-[16px]">
                {cancelButtonText ? (
                    <Button
                        variant="outlined"
                        label={cancelButtonText}
                        className="w-full text-app-grey-100 sm:w-[50%]"  
                        onClick={onReject}
                    />
                ) : null}
                {confirmButtonText ? (
                    <Button
                        variant="secondary"
                        label={confirmButtonText}
                        className="w-full sm:w-[50%]"
                        onClick={onResolve}
                    />
                ) : null}
            </div>
        </div>
    </Modal>
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const openConfirmationModal = createModal(CModal);

export default openConfirmationModal;