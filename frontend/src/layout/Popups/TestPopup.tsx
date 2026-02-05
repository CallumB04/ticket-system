import Button from "../../components/Button/Button";
import Popup from "../../components/Popup/Popup";
import PopupButtonsContainer from "../../components/Popup/PopupButtonsContainer";
import { usePopup } from "../../contexts/PopupContext";
import TestPopup2 from "./TestPopup2";

interface TestPopupProps {
    closePopup: () => void;
}

const TestPopup = ({ closePopup }: TestPopupProps) => {
    const { pushPopup, popPopup } = usePopup();

    return (
        <Popup
            title="Test Popup"
            description="This is a popup for testing purposes"
            closePopup={closePopup}
        >
            <p className="text-text-primary">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
                explicabo non dolores facere tempore consequatur placeat,
                reiciendis consectetur dolore quo pariatur, eum itaque provident
                unde beatae, voluptates nisi deleniti! Neque.
            </p>
            <PopupButtonsContainer>
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={() =>
                        pushPopup(<TestPopup2 closePopup={popPopup} />)
                    }
                >
                    Open other popup
                </Button>
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() =>
                        pushPopup(<TestPopup2 closePopup={popPopup} />, true)
                    }
                >
                    Open other popup (replace)
                </Button>
            </PopupButtonsContainer>
        </Popup>
    );
};

export default TestPopup;
