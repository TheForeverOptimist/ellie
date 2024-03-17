import { ReactNode } from "react"

const MaxWidthWrapper = ({
    className,
    children
}: {
    className?: string
    children: ReactNode
}) => {
    return(
        <div>{children}</div>
    )
}

export default MaxWidthWrapper