import {useOutletContext} from "react-router-dom";
import {FormEvent, useState} from "react";
import AssessmentFormLayout
    from "@/src/components/layout/assessment-form-layout";
import {FORM_ID} from "@/src/constants/forms.consts.ts";
import HappyverseSelect from "@/src/components/happyverse-select";
import {OutletCtx} from "@/src/types/ui/outlet-ctx.types.ts";
import {
    AssessmentHintItem,
    Assessments
} from "@/src/types/assesments/assesments.types.ts";
import {useChangeAssignment} from "@/src/hooks/use-change-assignment.ts";
import {useTouchForm} from "@/src/hooks/use-touch-form.ts";
import {useHints} from "@/src/hooks/use-hints";
import {useFormInitialValues} from "@/src/hooks/use-form-initial-values.ts";

const PHYSICAL_HEALTH_AND_LONGEVITY = 'Physical Health & Longevity';
const MENTAL_HEALTH_AND_MINDFULNESS = 'Mental Health & Mindfulness';
const FITNESS_AND_SPORTS = 'Fitness & Sports';
const NUTRITION_AND_CONSUMPTION = 'Nutrition & Consumption';
const SLEEP_AND_REST = 'Sleep & Rest';
const ENERGY_AND_POWER = 'Energy & Power';


const hintInfo: AssessmentHintItem[] = [
    {
        label: PHYSICAL_HEALTH_AND_LONGEVITY,
        hint: 'Are you happy with your state of physical health? Are you free from serious illnesses? Are you setting yourself up for a long and healthy life?'
    },
    {
        label: MENTAL_HEALTH_AND_MINDFULNESS,
        hint: 'How is your mental health? How often do you feel calm and balanced?'
    },
    {
        label: FITNESS_AND_SPORTS,
        hint: 'Are you satisfied with your physical fitness and exercise routine? Are you engaged in any sports?'
    },
    {
        label: NUTRITION_AND_CONSUMPTION,
        hint: 'Are you content with your nutrition and body shape?'
    },
    {
        label: SLEEP_AND_REST,
        hint: 'Are you satisfied with the quality of your sleep?'
    },
    {
        label: ENERGY_AND_POWER,
        hint: 'Do you feel like you have enough energy to put in efforts and accomplish your priorities?'
    },
]

const HealthForm = () => {
    const {onSubmit} = useOutletContext<OutletCtx>();
    const {handleChangeRange} = useTouchForm();

    const [physicalAndLongevity, setPhysicalAndLongevity] = useState(50);
    const [mentalAndMindfulness, setMentalAndMindfulness] = useState(50);
    const [fitnessAndSports, setFitnessAndSports] = useState(50);
    const [nutritionAndConsumption, setNutritionAndConsumption] = useState(50);
    const [sleepAndRest, setSleepAndRest] = useState(50);
    const [energyAndPower, setEnergyAndPower] = useState(50);

    const handleSubmit = (e: FormEvent) => {
        onSubmit(e, {
            assessment: Assessments.Health,
            params: {
                'Physical Health & Longevity': physicalAndLongevity,
                'Mental Health & Mindfulness': mentalAndMindfulness,
                'Fitness & Sports': fitnessAndSports,
                'Nutrition & Consumption': nutritionAndConsumption,
                'Sleep & Rest': sleepAndRest,
                'Energy & Power': energyAndPower,
            }
        })
    }

    useChangeAssignment({
        assessment: Assessments.Health,
        params: {
            'Physical Health & Longevity': physicalAndLongevity,
            'Mental Health & Mindfulness': mentalAndMindfulness,
            'Fitness & Sports': fitnessAndSports,
            'Nutrition & Consumption': nutritionAndConsumption,
            'Sleep & Rest': sleepAndRest,
            'Energy & Power': energyAndPower,
        }
    })

    useHints(hintInfo);

    useFormInitialValues(Assessments.Health, (res) => {
        if (res) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            res?.[PHYSICAL_HEALTH_AND_LONGEVITY] && setPhysicalAndLongevity(res?.[PHYSICAL_HEALTH_AND_LONGEVITY]);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            res?.[MENTAL_HEALTH_AND_MINDFULNESS] && setMentalAndMindfulness(res?.[MENTAL_HEALTH_AND_MINDFULNESS])
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            res?.[FITNESS_AND_SPORTS] && setFitnessAndSports(res?.[FITNESS_AND_SPORTS])
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            res?.[NUTRITION_AND_CONSUMPTION] && setNutritionAndConsumption(res?.[NUTRITION_AND_CONSUMPTION])
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            res?.[SLEEP_AND_REST] && setSleepAndRest(res?.[SLEEP_AND_REST])
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            res?.[ENERGY_AND_POWER] && setEnergyAndPower(res?.[ENERGY_AND_POWER])
        }
    });

    return (<AssessmentFormLayout formId={FORM_ID} onSubmit={handleSubmit}>
        <HappyverseSelect label={PHYSICAL_HEALTH_AND_LONGEVITY}
                          value={physicalAndLongevity}
                          onChange={value => handleChangeRange(value, setPhysicalAndLongevity)}/>
        <HappyverseSelect label={MENTAL_HEALTH_AND_MINDFULNESS}
                          value={mentalAndMindfulness}
                          onChange={value => handleChangeRange(value, setMentalAndMindfulness)}/>
        <HappyverseSelect label={FITNESS_AND_SPORTS}
                          value={fitnessAndSports}
                          onChange={value => handleChangeRange(value, setFitnessAndSports)}/>
        <HappyverseSelect label={NUTRITION_AND_CONSUMPTION}
                          value={nutritionAndConsumption}
                          onChange={value => handleChangeRange(value, setNutritionAndConsumption)}/>
        <HappyverseSelect label={SLEEP_AND_REST}
                          value={sleepAndRest}
                          onChange={value => handleChangeRange(value, setSleepAndRest)}/>
        <HappyverseSelect label={ENERGY_AND_POWER}
                          value={energyAndPower}
                          onChange={value => handleChangeRange(value, setEnergyAndPower)}/>
    </AssessmentFormLayout>)
}

export default HealthForm;