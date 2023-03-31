// formatterDate 将时间戳渲染为YYYY-MM-DD格式
export const formatterDate = (row, column, value) => {
    if (value) {
        const date = new Date(parseInt(value) * 1000);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }
    return '';
}

// restrictionFormat 渲染限制级标签
export const restrictionFormat = (row, column, value) => {
    if (value === 0) {
        return "否";
    } else {
        return "是";
    }
}