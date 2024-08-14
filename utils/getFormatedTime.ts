const getFormatedTime = (value: number) => {
    return `${value < 10 ? "0" : ""}${value}`;
};

export default getFormatedTime;
