interface InputLabelProps {
    text: string;
}

const InputLabel = ({ text }: InputLabelProps) => {
    return <p className="text-text-secondary text-sm font-medium">{text}</p>;
};

export default InputLabel;
