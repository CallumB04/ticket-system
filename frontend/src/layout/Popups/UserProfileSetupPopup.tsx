import { useState } from "react";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import Input from "../../components/Input/Input";
import Popup from "../../components/Popup/Popup";
import PopupButtonsContainer from "../../components/Popup/PopupButtonsContainer";
import { ALL_COUNTRIES } from "../../constants/countries";

interface UserProfileSetupPopupProps {
    closePopup: () => void;
}

const UserProfileSetupPopup = ({ closePopup }: UserProfileSetupPopupProps) => {
    // input element values
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    return (
        <Popup
            title="Setup Profile"
            description="Enter a few quick details to setup your personal profile"
            closePopup={closePopup}
            preventClose
        >
            {/* Form */}
            <div className="w-md max-w-full space-y-4">
                <Input
                    className="w-full"
                    label="First Name"
                    placeholder="Enter your first name"
                    onChange={(val) => setFirstName(val)}
                />
                <Input
                    className="w-full"
                    label="Last Name (optional)"
                    placeholder="Enter your last name"
                    onChange={(val) => setLastName(val)}
                />
                <Dropdown
                    className="w-full"
                    label="Country (optional)"
                    options={ALL_COUNTRIES}
                    placeholder="Choose a country"
                    onChange={(val) => setCountry(val)}
                />
            </div>
            <PopupButtonsContainer>
                <Button
                    variant="primary"
                    className="w-full"
                    disabled={firstName.length < 3}
                    onClick={closePopup}
                >
                    Save
                </Button>
            </PopupButtonsContainer>
        </Popup>
    );
};

export default UserProfileSetupPopup;
