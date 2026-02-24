interface InputLabelProps {
    text: string;
}

const InputLabel = ({ text }: InputLabelProps) => {
    return <p className="text-text-primary text-xs font-semibold">{text}</p>;
};

export default InputLabel;
