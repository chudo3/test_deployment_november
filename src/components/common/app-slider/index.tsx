import {SelectProps} from "@/src/types/ui/select.types.ts";
import Slider from '@mui/material/Slider';
// import Tooltip from '@mui/material/Tooltip';

const MAIN_COLOR = '#fafafa';

const sx = {
    '.MuiSlider-rail': {
        backgroundColor: MAIN_COLOR,
        height: 8,
        opacity: 1,
    },
    '.MuiSlider-track': {
        backgroundColor: MAIN_COLOR,
        borderColor: MAIN_COLOR,
        height: 8,
    },
    '.MuiSlider-thumb': {
        backgroundColor: '#fff',
        width: 24,
        height: 24,
    },
    '.MuiSlider-valueLabelOpen': {
        backgroundColor: MAIN_COLOR,
        padding: '8px 12px',
        fontWeight: 600,
        borderRadius: '8px !important',
        transform: 'translateY(43px) !important',
        '&::before': {
            top: '0 !important',
            transform: 'translate(-50%, -50%) rotate(45deg) !important'
        }
    }
}

const valueLabelFormat = (value: number) => `${value}%`;


const AppSlider = ({
                       value,
                       onChange,
                       defaultValue = 50
                   }: SelectProps) => {


    const handleChange = (_: Event, value: number | number[]) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !Array.isArray(value) && onChange?.(value);
    }

    return (
        <Slider
            value={value}
            valueLabelDisplay="on"
            sx={sx}
            onChange={handleChange}
            track={false}
            min={0}
            max={100}
            defaultValue={defaultValue}
            valueLabelFormat={valueLabelFormat}
        />
    )
}

export default AppSlider