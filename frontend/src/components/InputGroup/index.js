function InputGroup({ label, placeholder, type, name, handleChange, className }) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                className={className}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    )
}

export default InputGroup