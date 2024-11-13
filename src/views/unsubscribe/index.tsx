import BaseLayout from "@/src/components/layout/base-layout";

const UnsubView = () => {
    return (
        <BaseLayout>
            <main
                className="main flex justify-center items-center min-h-full min-w-full">
                <h2>
                    You have successfully unsubscribed!
                </h2>
            </main>
        </BaseLayout>
    )
}


export default UnsubView;