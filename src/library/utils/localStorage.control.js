export const setWithExpire = (key, value, expire) => {
    if (value === null) {
        try{
            localStorage.removeItem(key);
        }catch (e) {
            console.log(e);
        }
    } else {
        const currentTime = new Date();
        localStorage.setItem(key, JSON.stringify({
            value,
            expire: currentTime.getTime() + expire
        }));
    }
}

export const setWithoutExpire = (key, value) => {
    if (value === null) {
        try{
            localStorage.removeItem(key);
        } catch (e) {
            console.log(e);
        }
    } else {
        localStorage.setItem(key, JSON.stringify({
            value   
        }));
    }
}

export const getWithExpire = (key, callback) => {
    const data = localStorage.getItem(key);
    if (data != null) {
        const { value, expire } = JSON.parse(data);
        const currentTime = new Date();
        if (expire < currentTime.getTime()) {
            setWithExpire(key, null);
            return null;
        } 
        return value;
    }
    return null;
}
