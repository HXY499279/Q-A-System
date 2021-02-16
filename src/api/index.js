//?所有接口的封装类


import ajax from './ajax'


  /**
   * 登录
   * @param {string} userId - 用户名
   * @param {string} password - 密码
   */

   export const reqLogin = params => ajax('http://localhost:3000/api1/students', params, "GET")
   export const reqCategory = params => ajax('http://localhost:3000/api1/manage/category/list', params, "GET")

   //获取商品分页列表
   export const reqProduct = (pageNum, pageSize) => ajax('http://localhost:3000/api1/product', {pageNum, pageSize}, "GET")


  //  //? 搜索商品列表（根据商品描述）
  //  export const reqSearchProduct1 = ({pageNum, pageSize, searchName}) => ajax('url', {
  //    pageNum,
  //    pageSize,
  //    searchName
  //  },"GET")

  //  //? 搜索商品分页列表（根据商品描述）
  //  export const reqSearchProduct2 = ({pageNum, pageSize, searchDesc}) => ajax('url', {
  //   pageNum,
  //   pageSize,
  //   searchDesc
  // },"GET")

  //? 合并搜索
  export const reqSearchProduct2 = ({pageNum, pageSize, searchName, searchType}) => ajax('url', {
    pageNum,
    pageSize,
    [searchType]:searchName
  },"GET")

  


