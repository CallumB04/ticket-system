import Popup from "../../components/Popup/Popup";

interface TestPopup2Props {
    closePopup: () => void;
}

const TestPopup2 = ({ closePopup }: TestPopup2Props) => {
    return (
        <Popup
            title="Test Popup"
            description="This is a popup for testing purposes"
            closePopup={closePopup}
        >
            <p className="text-text-primary">This is another popup</p>
        </Popup>
    );
};

export default TestPopup2;
