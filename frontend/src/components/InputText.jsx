function InputText ({stateValue, id, type, maxLength, placeholder}){
    const [value, setValue] = stateValue

    function handlerInputText(event){
        setValue(event.target.value)
    };

    return(
        <input 
            id={id} 
            maxLength={maxLength} 
            onInput={handlerInputText} 
            type={type} 
            value={value}
            placeholder={placeholder}
        />
    );

};

export default InputText;