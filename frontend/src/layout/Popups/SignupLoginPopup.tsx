import { useEffect, useMemo, useState } from "react";
import Popup from "../../components/Popup/Popup";
import PopupButtonsContainer from "../../components/Popup/PopupButtonsContainer";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Input/TextInput";
import ClickableText from "../../components/Text/ClickableText";
import { signIn, signUp } from "../../supabase/users";
import { AuthApiError, AuthWeakPasswordError } from "@supabase/supabase-js";

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

    // Log in -> invalid credentials
    // Sign up -> weak password, incorrect email, etc
    const [errorText, setErrorText] = useState<string>("");

    // Hide error text when popup state changes
    useEffect(() => {
        setErrorText("");
    }, [state]);

    // TODO: add realistic validity checks for both inputs
    const isValidEmail: boolean = useMemo(() => {
        return emailInputValue.includes("@");
    }, [emailInputValue]);

    const isValidPassword: boolean = useMemo(() => {
        return passwordInputValue.length >= 6;
    }, [passwordInputValue]);

    // Form submit handlers
    const handleLogin = async () => {
        try {
            const resp = await signIn(emailInputValue, passwordInputValue);
            if (resp.session) {
                closePopup();
            }
        } catch (error) {
            setErrorText("Invalid login credentials, please try again");
        }
    };

    const handleSignup = async () => {
        try {
            const resp = await signUp(emailInputValue, passwordInputValue);
            if (resp.session) {
                closePopup();
            }
        } catch (error) {
            if (error instanceof AuthWeakPasswordError) {
                setErrorText(
                    "Password must be at least 8 characters long, and must contain at least one uppercase character and number"
                );
            } else if (error instanceof AuthApiError) {
                setErrorText(
                    "This account already exists, please log in instead"
                );
            } else {
                setErrorText("There was an issue signing up, please try again");
            }
        }
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
                {/* Error text (if visible) */}
                {errorText && (
                    <p className="text-danger max-w-96 text-xs wrap-break-word">
                        {errorText}
                    </p>
                )}
                {/* Forgot Password text */}
                <span className="flex justify-end">
                    <ClickableText
                        className="text-xs"
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
