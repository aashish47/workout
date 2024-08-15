const getFormatedTime = (value: number) => {
    return value < 0 ? "00" : `${value < 10 ? "0" : ""}${value}`;
};

export default getFormatedTime;
