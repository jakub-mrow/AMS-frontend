import panelImage from "../public/panel_graphics.png"

const LoginPanel = () => {
  return (
    <>
        <h1 className="text-white text-9xl font-bold italic">
            AMS 
        </h1>
        <img src={panelImage} width="500" className="mt-8"/>
    </>
  )
}

export default LoginPanel;