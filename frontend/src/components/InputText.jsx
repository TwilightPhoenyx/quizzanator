function InputText ({value, valueSetter}){

    function handlerInputText(event){
        valueSetter(event.target.value)
    };

    return(
        <input onInput={handlerInputText} type="text" defaultValue={value}/>
    );

};

export default InputText;