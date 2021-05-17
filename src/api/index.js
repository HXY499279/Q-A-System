//?所有接口的封装类


import ajax from './ajax'


  /**
   * 登录
   * @param {string} userId - 用户名
   * @param {string} password - 密码
   */
   export const reqLogin = params => ajax('/admin/login', params, "POST")

   //?统计数据接口
  /**
   * 今日数据请求函数
  */
   export const reqTodayData = params => ajax('/admin/todayStatistic', params, "GET")

  /**
   * 志愿者相关
   * @param {int} currentPage 
   * @param {int} pageSize
   * @returns 
   */
  export const reqVolunteer = params => ajax('/admin/getVolunteerStatistic', params, "GET")

  /**
   * 学科相关
   * @param {int} currentPage 
   * @param {int} pageSize
   * @returns 
   */
   export const reqSubject = params => ajax('/admin/getSubjectStatistic', params, "GET")


   /**
    * 登录相关
    */
  export const reqLoginStatistic = params => ajax('/admin/loginStatistic', params, "GET")

  
   /**
    * 问题相关
    */
  export const reqQuestionStatistic = params => ajax('/admin/questionStatistic', params, "GET")



  //?问题管理页面
  /**
   * 查询相关问题，如果参数都不传的话则为请求所有问题
   * @param {string} title 
   * @param {subjectName} string 
   * @param {college} string 
   * @param {questionAccountName} string 
   * @param {state} string 
   * @param {time} string 
   * @param {answerAccountName} string 
   * @param {currentPage} int 
   * @param {pageSize} int 
   * @returns 
   */
   export const reqListQuestion = params => ajax('/admin/listQuestion', params, "GET")
  /**
   * 修改问题
   * @param {questionId} int 
   * @param {title} string
   * @param {describes} string
   * @param {img} file
   * @param {adminId} int
   * @returns 
   */
   export const reqUpdateQuestion = params => ajax('/admin/updateQuestion', params, "POST")
  /**
   * 隐藏问题
   * @param {questionId} int
   * @param {adminId} int
   * @returns 
   */
   export const reqDisapperQuestion = params => ajax('/admin/disappearQuestion', params, "POST")
  /**
   * 查看提问者信息
   * @param {questionAccountId} int
   * @returns 
   */
   export const reqGetAccountById = params => ajax('/account/getAccountById', params, "GET")
   /**
    * 详情页_问题
    * @param {int} questionId 
    * @param {int} accountId 
    * @returns 
    */
    export const reqGetQuestionById = params => ajax('/question/getQuestionById', params, "GET")
  /**
   * 详情页——回答
   * @param {*} params 
   * @returns 
   */

   //?用户管理页面接口
   /**
    * 查询相关用户
    * @college {string} 
    * @userName {string}  
    * @role {int}  
    * @currentPage {int}  
    * @pageSize {int}
    * @returns 
    */
    export const reqListAccount = params => ajax('/admin/listAccount', params, "GET")
    /**
     * 获取全部学科信息
     * @returns 
     */
     export const reqListAllSubject = params => ajax('/admin/listAllSubject', params, "GET")
    

    //?资讯管理页面接口
    /**
     * 查询相关咨询
     * @param {string} title 
     * @param {string} adminName 
     * @param {string} publishTime 
     * @param {int} currentPage 
     * @param {int} pageSize 
     * @returns 
     */
     export const reqListNews = params => ajax('/admin/listNews', params, "GET")
     /**
      * 添加新的咨询
      * @param {string} title 
      * @param {string} content 
      * @param {file} img 
      * @param {int} adminId 
      * @returns 
      */
      export const reqAddNews = params => ajax('/admin/addNews', params, "POST")
      /**
       * 删除咨询
       * @param {int} adminId 
       * @param {int} newsId 
       * @returns 
       */
       export const reqDeleteNewsById = params => ajax('/admin/deleteNewsById', params, "POST")
       /**
        * 修改咨询
        * @param {int} newsId 
        * @param {string} title 
        * @param {string} content 
        * @param {file} img 
        * @param {int} adminId 
        * @returns 
        */
        export const reqUpdateNews = params => ajax('/admin/updateNews', params, "POST")
        /**
         * 查看资讯详情
         * @param {int} newsId 
         * @returns 
         */
         export const reqGetNews = params => ajax('/admin/getNews', params, "GET")



   //?学科管理页面请求接口
   /**
    * 获取全部学院 
    */
    export const reqGetAllCollege = params => ajax('/admin/getAllCollege', params, "GET")

    /**
     * 查询相关学科
     * @subjectName {string}  
     * @college {string}  
     * @currentPage {int}  
     * @pageSize {int}  
     * @returns 
     */
     export const reqListSubject = params => ajax('/admin/listSubject', params, "GET")
     /**
      * 添加学科
      * @param {file} icon
      * @param {string} subjectName
      * @param {string} college
      * @param {string} subjectInfo
      * @param {string} note
      * @param {int} adminId 
      * @returns 
      */
      export const reqAddSubject = params => ajax('/admin/addSubject', params, "POST")
      /**
       * 查询学科详情
       * @param {int} subjectId 
       * @returns 
       */
       export const reqGetSubjectById = params => ajax('/admin/getSubjectById', params, "GET")
       /**
        * 修改学科信息
          * @param {file} icon
          * @param {string} subjectName
          * @param {string} college
          * @param {string} subjectInfo
          * @param {string} note
          * @param {int} adminId 
          * @returns
        */
        export const reqUpdateSubject = params => ajax('/admin/updateSubject', params, "POST")
        /**
         * 删除学科
         * @param {int} subjectId 
         * @param {int} adminId
         * @returns 
         */
         export const reqDeleteSubject = params => ajax('/admin/deleteSubject', params, "GET")
  








    //?举报和反馈页面接口
    /**
     * 
     * @content {string} 举报内容 
     * @reportTime {string} 举报时间 
     * @reportAccountName {string} 举报人 
     * @reportedAccountName {string} 被举报人 
     * @state {int} 举报的状态(1是已经解决,0是未解决) 
     * @type {int} 举报类型(1是问题,2是回答,3是评论) 
     * @currentPage {int} 当前页数 
     * @pageSize {int} 页面记录数 
     * @returns 
     */
    export const reqListReport = params => ajax("/admin/listReport",params,"GET")

    /**
     * 查看举报信息详情
     * @reportId {int} 举报id 
     * @returns 
     */
     export const reqGetReportById = params => ajax("/admin/getReportById",params,"GET")

     /**
      * 隐藏举报信息
      * @reportId {int} 举报的id 
      * @adminId {int} 管理员一卡通
      * @returns 
      */
      export const reqDeleteReportById = params => ajax("/admin/deleteReportById",params,"POST")

      /**
       * 查询相关反馈
       * @param {string} content 
       * @param {string} accountName
       * @param {string} feedbackTime
       * @param {int} state
       * @param {int} currentPage
       * @param {int} pageSize
       * @returns 
       */
       export const reqListFeedback = params => ajax("/admin/listFeedback",params,"GET")
       /**
        * 隐藏反馈信息
        * @param {int} feedbackId 
        * @param {int} adminId 
        * @returns 
        */
        export const reqDeleteFeedbackById = params => ajax("/admin/deleteFeedbackById",params,"POST")
        /**
         * 解决反馈
         * @param {int} feedbackId 
         * @param {int} adminId 
         * @returns 
         */
         export const reqUpdateFeedbackState = params => ajax("/admin/updateFeedbackState",params,"POST")
         /**
          * 查看反馈
          * @param {int} feedbackId 
          * @returns 
          */
          export const reqGetFeedback = params => ajax("/admin/getFeedback",params,"POST")

    //?界面管理接口
    /**
     * 查看所有图片 
     */
    export const reqListStaticImg = params => ajax('/admin/listStaticImg',params,"GET")

    /**
     * 
     * @img {*} file 
     * @adminId {*} int 
     * @imgId {*} int 
     * @type {*} int 
     * @returns 
     */
    export const reqUpdateStaticImg = params => ajax('/admin/updateStaticImg',params,"POST")



    //?日志管理页面接口
    /**
     * 查询相关日志
     * @adminName {*} string 
     * @type {*} int 
     * @logTime {*} string
     * @currentPage {*} int
     * @pageSize {*} int
     * @returns 
     */
    export const reqListLog = params => ajax("/admin/listLog",params,"GET")
    /**
     * 查看日志信息详情
     * @logId {*} int 
     * @returns 
     */
    export const reqGetLogById = params => ajax("/admin/getLogById",params,"GET")


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

  


