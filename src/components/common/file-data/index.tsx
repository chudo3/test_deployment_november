interface Props {
    file: File;
}

const FileData = ({file}: Props) => {
    return (<div
        className='file-data flex flex-row items-center gap-1 text-app-font-color max-w-[160px] overflow-hidden font-semibold truncate'>
        <p className='file-data-label text-app-font-color truncate text-xs md:text-base'>{file.name}</p>
    </div>)
}

export default FileData;