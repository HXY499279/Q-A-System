import {createStore} from 'redux'
import {questionChangeTitle,questionChangeDescribe,questionChangeImg,questionId,stuId} from './reducers'
export const qID = createStore(questionId);
export const qTitleStore = createStore(questionChangeTitle);
export const qDescribeStore = createStore(questionChangeDescribe);
export const qImgStore = createStore(questionChangeImg);
export const stuIdStore = createStore(stuId);

