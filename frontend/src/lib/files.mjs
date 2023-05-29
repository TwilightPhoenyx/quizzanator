function aDataURL(file, handler) {
    const reader = new FileReader();
    reader.addEventListener("load", ()=>handler(reader.result), false);
    reader.readAsDataURL(file);
}

export {
    aDataURL
}