interface InputLabelProps {
    text: string;
}

const InputLabel = ({ text }: InputLabelProps) => {
    return (
        <p className="text-text-secondary font-mono text-[12px] font-medium tracking-[0.04em]">
            {text}
        </p>
    );
};

export default InputLabel;
