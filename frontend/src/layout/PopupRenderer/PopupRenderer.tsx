import { usePopup } from "../../contexts/PopupContext";

const PopupRenderer = () => {
    const { popupStack } = usePopup();

    // if any popups exist on the stack, renders the popup at the top position
    // if empty, returns nothing
    return popupStack.length > 0 ? popupStack[0] : <></>;
};

export default PopupRenderer;
