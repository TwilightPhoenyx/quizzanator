function InputText ({stateValue, maxLength}){
    const [value, setValue] = stateValue

    function handlerInputText(event){
        setValue(event.target.value)
    };

    return(
        <input maxLength={maxLength} onInput={handlerInputText} type="text" value={value}/>
    );

};

export default InputText;