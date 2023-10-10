
const AssetOverviewHeader = () => {
    return (
        <div className="flex flex-col m-6">
            <div className="flex flex-row space-x-4 items-center justify-between">
                <div className="flex flex-row space-x-4">
                    <div className="space-x-2">
                        <span className="text-4xl font-bold ">76.63</span>
                        <span className="">USD</span>
                        <span className="font-bold text-2xl text-green-700">+0.53%</span>
                    </div>
                    
                </div>
        
                <div className="flex flex-row border rounded-lg space-x-4 p-2 justify-center items-center">
                    <div>
                        <span>Ticker: </span>
                        <span className="font-bold">VUSA</span>
                    </div>
                    <div>
                        <span>Exchange: </span>
                        <span className="font-bold">XETRA</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetOverviewHeader;