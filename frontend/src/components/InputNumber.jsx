function InputNumber({text, minValue, maxValue, number, numberSetter}) {

    function handlerInputValue(event){
        const savedValue = number

        if (
            /^[0-9]*$/.test(event.target.value) === true
            &&
            event.target.value <= Number(maxValue)
            ) 
                {
                    numberSetter(event.target.value);
                } 
        else {
                event.target.value = savedValue;
        };  
    };


    return(

        <label>
            {text}:
            <input 
                onInput={handlerInputValue} 
                type="number"
                min={minValue}
                max={maxValue}
                defaultValue={number}
            />
        </label>

    );



};

export default InputNumber;