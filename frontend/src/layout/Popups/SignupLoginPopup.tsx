import { useMemo, useState } from "react";
import Popup from "../../components/Popup/Popup";
import PopupButtonsContainer from "../../components/Popup/PopupButtonsContainer";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Input/TextInput";
import ClickableText from "../../components/Text/ClickableText";

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

    // Input values
    const [emailInputValue, setEmailInputValue] = useState<string>("");
    const [passwordInputValue, setPasswordInputValue] = useState<string>("");

    // TODO: add realistic validity checks for both inputs
    const isValidEmail: boolean = useMemo(() => {
        return emailInputValue.includes("@");
    }, [emailInputValue]);

    const isValidPassword: boolean = useMemo(() => {
        return passwordInputValue.length >= 8;
    }, [passwordInputValue]);

    // Form submit handlers
    const handleLogin = () => {
        alert("Logged in!");
    };

    const handleSignup = () => {
        alert("Signed up!");
    };

    return (
        <Popup
            title={state === "signup" ? "Create an Account" : "Welcome Back"}
            description={
                state === "signup"
                    ? "Sign up to Ticket System for free today"
                    : "Log in to your Ticket System account"
            }
            closePopup={closePopup}
        >
            {/* Form */}
            <div className="space-y-3">
                {/* Email and Password Inputs */}
                <TextInput
                    className="w-96"
                    label="Email"
                    type="email"
                    onChange={(val) => setEmailInputValue(val)}
                />
                <TextInput
                    className="w-96"
                    label="Password"
                    type="password"
                    onChange={(val) => setPasswordInputValue(val)}
                />
                {/* Forgot Password text */}
                <span className="flex justify-end">
                    <ClickableText
                        className="w-max text-xs"
                        onClick={() => alert("Forgot password.")}
                    >
                        Forgot Password?
                    </ClickableText>
                </span>
            </div>
            <PopupButtonsContainer>
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={state === "signup" ? handleSignup : handleLogin}
                    disabled={!isValidEmail || !isValidPassword}
                >
                    {state === "signup" ? "Sign up" : "Log in"}
                </Button>
            </PopupButtonsContainer>
            {/* Switch between signup / login text */}
            <span className="flex justify-center gap-1 text-sm">
                <p className="text-text-secondary">
                    {state === "signup"
                        ? "Already have an account?"
                        : "Haven't been here before?"}
                </p>
                <ClickableText
                    onClick={() =>
                        setState((prev) =>
                            prev === "login" ? "signup" : "login"
                        )
                    }
                >
                    {state === "signup" ? "Log in" : "Sign up"}
                </ClickableText>
            </span>
        </Popup>
    );
};

export default SignupLoginPopup;
