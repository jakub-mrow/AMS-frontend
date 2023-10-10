import { FC } from 'react'

interface AssetDetailsCardTitleProps {
    cardTitle: string;
}

const AssetDetailsCardTitle: FC<AssetDetailsCardTitleProps> = ({ cardTitle }) => {
    return (
        <div className="bg-primary text-white p-2 rounded-t">
            <h2 className="text-md font-semibold font-poppins">{cardTitle}</h2>
        </div>
    )
}

export default AssetDetailsCardTitle