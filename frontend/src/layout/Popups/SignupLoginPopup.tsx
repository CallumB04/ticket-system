import { useState } from "react";
import Popup from "../../components/Popup/Popup";
import PopupButtonsContainer from "../../components/Popup/PopupButtonsContainer";
import Button from "../../components/Button/Button";

type PopupState = "signup" | "login";

interface SignupLoginPopupProps {
    closePopup: () => void;
    initialState: PopupState;
}

const SignupLoginPopup = ({
    closePopup,
    initialState,
}: SignupLoginPopupProps) => {
    const [state, setState] = useState<PopupState>(initialState);

    return (
        <Popup
            title={state === "signup" ? "Create an Account" : "Welcome Back"}
            description={
                state === "signup"
                    ? "Join Ticket System for free today"
                    : "Log in to your Ticket System account"
            }
            closePopup={closePopup}
        >
            <PopupButtonsContainer>
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={() =>
                        setState((prev) =>
                            prev === "login" ? "signup" : "login"
                        )
                    }
                >
                    {state === "signup" ? "Sign up" : "Log in"}
                </Button>
            </PopupButtonsContainer>
        </Popup>
    );
};

export default SignupLoginPopup;
