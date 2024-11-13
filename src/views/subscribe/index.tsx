import {Link} from "react-router-dom";
import Button from "@/src/components/common/button";
import SubscribeLogo from "../../assets/icons/subscribe-logo.svg?react"

export default function SubscribeView() {

    return (
        <section
            className="subscribe flex flex-col justify-center items-center gap-2 min-w-screen min-h-screen p-[45px]">
            <SubscribeLogo className="w-40 h-auto md:w-64"/>
            <p className='md:max-w-2xl text-center mx-auto text-xs md:text-base'>
                Happyverse.ai is an open-source happiness management system with
                a mission to improve people's happiness and well-being by
                leveraging safe & efficient AI infrastructure
            </p>
            <Link to='/'>
                <Button label='Go to app' variant={'secondary'}/>
            </Link>

        </section>
    )
}