import {
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Files from "react-files";
import Button from "@/src/components/common/button";
import FileData from "@/src/components/common/file-data";
import {useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import BaseLayout from "@/src/components/layout/base-layout";

import InfoIcon from '../../../assets/icons/info.svg?react'
import FileIcon from '../../../assets/icons/file.svg?react';
import LeftArrowIcon from '../../../assets/icons/black-chevron-left.svg?react';

import {getSvgForTitle} from "../../../utils/svgUtils";
import "./style.css"


interface Props {
    children?: ReactNode;
    controls?: ReactNode;
    onClickBack?: () => void;
    title: string;
    onClickHint?: () => void;
}


const AssessmentPageLayout = ({
                                  children,
                                  title,
                                  controls,
                                  onClickBack,
                                  onPickFile,
                                  onRemoveFile,
                                  onClickHint,
                                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-expect-error
                              }: Props, ref) => {
    const [files, setFiles] = useState<Files>([]);
    const location = useLocation();
    const backButtonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getBackButton: () => backButtonRef.current,
    }))

    useEffect(() => {
        //     cleanup on change location
        setFiles([]);
        onRemoveFile?.()
        window.scrollTo(0, 0);
    }, [location]);

    const handleChange = (files: File[]) => {
        setFiles(files);
        onPickFile?.(files[0]);
    }
    const handleRemoveFile = () => {
        setFiles([]);
        onRemoveFile?.();
    }

    return (
        <BaseLayout headerLeftContent={<div
            className='border-none bg-none text-app-font-color md:min-w-64'>
            <Button prefix={<LeftArrowIcon/>}
                    label='Back'
                    ref={backButtonRef}
                    onClick={onClickBack}
                    className='md:p-2 md:px-4 max-h-[38px] md:max-h-[42px] md:text-base text-sm !px-2'
            />

        </div>}
                    headerRightContent={<div className='files md:min-w-64'>
                        {files.length ?
                            <div className='selected-file flex flex-row gap-2'>
                                <FileData file={files.at(0)}/>
                                <Button label='X'
                                        className='md:p-2 md:!px-4 md:text-base !px-3 text-sm'
                                        onClick={handleRemoveFile}></Button>
                            </div>
                            : <Files
                                className='files-dropzone'
                                onChange={handleChange}
                                accepts={['.pdf', '.doc', '.docx']}
                                maxFileSize={5242880}
                                minFileSize={0}
                                clickable
                                onError={(e: {
                                    code: string,
                                    message: string
                                }) => toast.error(e.message)}
                            >
                                <Button prefix={<FileIcon/>}
                                        label='Add file (.pdf, .docx, <5 Mb)'
                                        className='md:text-base text-sm max-h-[38px] md:max-h-[42px] !px-2'
                                />
                            </Files>}
                    </div>}
                    footer={controls}
        >
            <main
                className='metrics-page-layout container md:max-w-[80%] pb-0 sm:pb-4 md:p-8 mt-[58px] sm:mt-[42px] md:mt-0 w-full m-auto'>
                <div className='flex flex-col items-center'>
                    <div
                        className='metrics-page-layout__content-wrapper_mobile md:metrics-page-layout__content-wrapper flex flex-col gap-16 min-w-[94%] md:min-w-0 md:w-[80%] md:max-w-[700px]'>
                        <div
                            className='metrics-page-layout__container flex flex-col bg-white gap-5 rounded-[32px] bg-metrics-page-container'
                        >
                            <div
                                className='flex justify-between items-center p-4 sm:p-6 border-b'>
                                <h4 className='flex items-center text-metrics text-[14px] sm:text-[16px] font-semibold text-app-happyverse-slider-label'>
                                    {getSvgForTitle(title)}
                                    {title}
                                </h4>
                                <button
                                    className="flex items-center group hover:text-[#7a7a7a]"
                                    onClick={onClickHint}>
                                    <span
                                        className="mr-2 text-app-default-font text-[14px] sm:text-[16px] font-semibold group-hover:text-[#7a7a7a]">INFO</span>
                                    <InfoIcon
                                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:filter group-hover:invert-[40%] group-hover:brightness-[80%] group-hover:saturate-0"/>
                                </button>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </BaseLayout>

    )
}

export default forwardRef(AssessmentPageLayout);