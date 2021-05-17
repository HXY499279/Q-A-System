//?问题管理页面修改问题的信息保存
//问题id
export const questionId = (pre,action) => {
    const {type,value} = action;
        return value;
    }
//问题标题
export const questionChangeTitle = (pre,action) => {
    const {type,value} = action;
        return value;
    }
//问题描述
export const questionChangeDescribe = (pre,action) => {
    const {type,value} = action;
    return value;
}
//问题图片，没有用到
export const questionChangeImg = (pre,action) => {
    const {type,value} = action;
    return value;
}
//提问者学号
export const stuId = (pre,action) => {
    const {type,value} = action;
    return value;
}
