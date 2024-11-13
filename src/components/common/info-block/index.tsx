interface Props {
    label: string;
    value: string | number;
}

function Label({label}: { label: string | number }) {
    return <p className='info-block__label text-sm font-medium'>{label}</p>
}

export default function InfoBlock({label, value}: Props) {
    return <div
        className='info-block flex flex-row gap-3 justify-between items-center rounded-full p-1 pl-2.5 bg-app-info-block-bg'>
        <Label label={label}/>
        <div
            className='info-block__value-wrapper flex flex-row justify-center items-center rounded-full py-0.5 px-2.5 bg-white'>
            <Label label={value}/>
        </div>
    </div>
}