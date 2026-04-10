interface InputLabelProps {
    text: string;
}

const InputLabel = ({ text }: InputLabelProps) => {
    return (
        <p className="text-text-secondary font-mono text-xs font-medium">
            {text}
        </p>
    );
};

export default InputLabel;
