export const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

export const controlValue = (value) => {
    if (value === undefined || value === null) {
        return '';
    }
    return value;
}

export const getDictValues = (dict) => {
    let res = [];
    for (let i in dict) {
        res.push(dict[i]);
    }
    return res;
}