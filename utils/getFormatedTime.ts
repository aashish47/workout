import getFormatedDigit from "@/utils/getFormatedDigit";

const getFormatedTime = (totalTime: number) => {
    const min = Math.floor(totalTime / 60);
    const hours = Math.floor(min / 60);
    const minutes = hours ? min % 60 : min;
    const seconds = totalTime % 60;

    return `${!hours ? "" : `${getFormatedDigit(hours)}:`}${getFormatedDigit(minutes)}:${getFormatedDigit(seconds)}`;
};

export default getFormatedTime;
