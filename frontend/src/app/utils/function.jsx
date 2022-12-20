import { ui_avatar_api } from "./config";

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

export const getFilterPair = (id, dict) => {
	let res = {};
	for (let i in id) {
		res[id[i]] = dict[id[i]];
	}
	return res;
}

export const stringToColour = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

export const getDocumentThumbnail = (name) => {
    return ui_avatar_api + "name=" + name + "&background=" + stringToColour(name);
}

export const toDateString = (str) => {
    const date = new Date(str);
    return date.toLocaleTimeString() + " " + date.toDateString();

}