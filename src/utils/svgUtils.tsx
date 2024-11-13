import HealthIcon from '../assets/icons/health.svg?react'
import EmotionsIcon from '../assets/icons/emotions.svg?react'
import IntelligenceIcon from '../assets/icons/intelligence.svg?react'
import ProductivityIcon from '../assets/icons/productivity.svg?react'
import RelationshipIcon from '../assets/icons/relationships.svg?react'
import FreedomIcon from '../assets/icons/freedom.svg?react'
import LoveIcon from '../assets/icons/love.svg?react'
import OccupationIcon from '../assets/icons/occupation.svg?react'
import WealthIcon from '../assets/icons/wealth.svg?react'

export const getSvgForTitle = (title: string) => {
    const normalizedTitle = title.toLowerCase();
    const iconClass = "w-4 h-4 mr-2 svg-black svg-remove-gradient sm:w-6 sm:h-6 sm:mr-3";

    switch (normalizedTitle) {
        case 'health':
            return <HealthIcon className={iconClass} />;
        case 'emotions':
            return <EmotionsIcon className={iconClass} />;
        case 'intelligence':
            return <IntelligenceIcon className={iconClass} />;
        case 'productivity':
            return <ProductivityIcon className={iconClass} />;
        case 'relationships':
            return <RelationshipIcon className={iconClass} />;
        case 'freedom':
            return <FreedomIcon className={iconClass} />;
        case 'love':
            return <LoveIcon className={iconClass} />;
        case 'occupation':
            return <OccupationIcon className={iconClass} />;
        case 'wealth':
            return <WealthIcon className={iconClass} />;
        default:
            return null;
    }
};