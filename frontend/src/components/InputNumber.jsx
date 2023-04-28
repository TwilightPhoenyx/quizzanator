function InputNumber({text, minValue, maxValue, stateNumber}) {
    const [number, setNumber] = stateNumber
    
    function handlerInputValue(event){
        const savedValue = number

        if (
            /^[0-9]*$/.test(event.target.value) === true
            &&
            event.target.value <= Number(maxValue)
            ) 
                {
                    setNumber(event.target.value);
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
                value={number}
            />
        </label>

    );



};

export default InputNumber;