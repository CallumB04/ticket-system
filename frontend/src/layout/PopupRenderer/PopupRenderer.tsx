import { usePopup } from "../../contexts/PopupContext";

const PopupRenderer = () => {
    const { popupStack } = usePopup();
    return popupStack.length > 0 ? popupStack[0] : <></>;
};

export default PopupRenderer;
