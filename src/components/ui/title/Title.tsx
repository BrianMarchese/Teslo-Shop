import { titleFont } from "@/config/fonts"

interface Props {
    title: string
    subtitle?: string
    className?: string
}


export const Title = ({ title, subtitle, className }: Props) => {
    return (
        <div className={`mt-3 ${ className }`}>
            <h1 className={`${ titleFont.className } antialiased text-4xl font-semibold my-7 mx-2`}>
                { title }
            </h1>

            {
                subtitle && (
                    <h3 className="text-xl mb-5 mx-2">{ subtitle }</h3>
                )
            }

        </div>
    )
}