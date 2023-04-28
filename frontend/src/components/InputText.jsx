function InputText ({stateValue}){
    const [value, setValue] = stateValue

    function handlerInputText(event){
        setValue(event.target.value)
    };

    return(
        <input onInput={handlerInputText} type="text" value={value}/>
    );

};

export default InputText;