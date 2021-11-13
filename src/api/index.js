//?所有接口的封装类


import ajax from './ajax'
const url = 'https://xscqa.cqupt.edu.cn/question'
// const url =''


// "proxy": "https://xscqa.cqupt.edu.cn/question/"
  /**
   * 登录
   */
  //  export const reqLogin = params => ajax(url + '/adminCasLogin', params, "GET")


  /**
   * 登录
   */
   export const reqLogin = params => ajax(url + '/admin/login', params, "POST")


  //  export const logout = params => ajax("/authserver/logout",params,"GET")


   //?获取登录信息
   export const reqLoginInfo = params => ajax(url + '/getAdminInfo', params, "GET")



   //?统计数据接口
  /**
   * 今日数据请求函数
  */
   export const reqTodayData = params => ajax(url + '/admin/todayStatistic', params, "GET")

  /**
   * 志愿者相关
   */
  export const reqVolunteer = params => ajax(url + '/admin/getVolunteerStatistic', params, "GET")

  /**
   * 学科相关m
   */
   export const reqSubject = params => ajax(url + '/admin/getSubjectStatistic', params, "GET")


   /**
    * 登录相关
    */
  export const reqLoginStatistic = params => ajax(url + '/admin/loginStatistic', params, "GET")

  
   /**
    * 问题相关
    */
  export const reqQuestionStatistic = params => ajax(url + '/admin/questionStatistic', params, "GET")



  //?问题管理页面
  /**
   * 查询相关问题，如果参数都不传的话则为请求所有问题
   */
   export const reqListQuestion = params => ajax(url + '/admin/listQuestion', params, "GET")
  /**
   * 修改问题
   */
   export const reqUpdateQuestion = params => ajax(url + '/admin/updateQuestion', params, "POST")
  /**
   * 隐藏问题 
   */
   export const reqDisapperQuestion = params => ajax(url + '/admin/disappearQuestion', params, "POST")
  /**
   * 查看提问者信息
   */
   export const reqGetAccountById = params => ajax(url + '/account/getAccountById', params, "GET")
   /**
    * 详情页_问题
    */
    export const reqGetQuestionById = params => ajax(url + '/question/getQuestionById', params, "GET")
   /**
    * 详情页_问题
    */
    export const reqGetQuestionById2 = params => ajax(url + '/admin/listQuestionDetail', params, "GET")

   //?用户管理页面接口
   /**
    * 查询相关用户
    */
    export const reqListAccount = params => ajax(url + '/admin/listAccount', params, "GET")
    /**
     * 获取全部学科信息
     */
    export const reqListAllSubject = params => ajax(url + '/admin/listAllSubject', params, "GET")
     /**
     * 修改用户角色
     */
      export const reqUpdateAccountRole = params => ajax(url + '/admin/updateAccountRole', params, "POST")

      /**
       * 删除用户
       */
       export const reqDeleteAccountById = params => ajax(url + '/admin/deleteAccountById', params, "POST")
       
   
    

    //?资讯管理页面接口
    /**
     * 查询相关咨询
     */
     export const reqListNews = params => ajax(url + '/admin/listNews', params, "GET")
     /**
      * 添加新的咨询
      */
      export const reqAddNews = params => ajax(url + '/admin/addNews', params, "POST")
      /**
       * 删除咨询
       */
       export const reqDeleteNewsById = params => ajax(url + '/admin/deleteNewsById', params, "POST")
       /**
        * 修改咨询
        */
        export const reqUpdateNews = params => ajax(url + '/admin/updateNews', params, "POST")
        /**
         * 查看资讯详情
         */
         export const reqGetNews = params => ajax(url + '/admin/getNews', params, "GET")



   //?学科管理页面请求接口
   /**
    * 获取全部学院 
    */
    export const reqGetAllCollege = params => ajax(url + '/admin/getAllCollege', params, "GET")
    /**
     * 查询相关学科
     */
     export const reqListSubject = params => ajax(url + '/admin/listSubject', params, "GET")
     /**
      * 添加学科
      */
      export const reqAddSubject = params => ajax(url + '/admin/addSubject', params, "POST")
      /**
       * 查询学科详情
       */
       export const reqGetSubjectById = params => ajax(url + '/admin/getSubjectById', params, "GET")
       /**
        * 修改学科信息
        */
        export const reqUpdateSubject = params => ajax(url + '/admin/updateSubject', params, "POST")
        /**
         * 删除学科
         */
         export const reqDeleteSubject = params => ajax(url + '/admin/deleteSubject', params, "POST")
  


    //?举报和反馈页面接口
    /**
     * 举报查询 
     */
    export const reqListReport = params => ajax(url + "/admin/listReport",params,"GET")

    /**
     * 查看举报信息详情 
     */
     export const reqGetReportById = params => ajax(url + "/admin/getReportById",params,"GET")

     /**
      * 隐藏举报信息
      */
      export const reqDeleteReportById = params => ajax(url + "/admin/deleteReportById",params,"POST")
    /**
     * 解决举报信息
     */
     export const reqUpdateReportState = params => ajax(url + "/admin/updateReportState",params,"POST")

     /**
      * 警告被举报者
      */
      export const reqWarnAccount = params => ajax(url + "/admin/warnAccount",params,"POST")

      /**
       * 反馈查询
       */
       export const reqListFeedback = params => ajax(url + "/admin/listFeedback",params,"GET")
       /**
        * 隐藏反馈信息 
        */
        export const reqDeleteFeedbackById = params => ajax(url + "/admin/deleteFeedbackById",params,"POST")
        /**
         * 解决反馈
         */
         export const reqUpdateFeedbackState = params => ajax(url + "/admin/updateFeedbackState",params,"POST")
         /**
          * 查看反馈
          */
          export const reqGetFeedback = params => ajax(url + "/admin/getFeedback",params,"GET")

    //?界面管理接口
    /**
     * 查看所有图片 
     */
    export const reqListStaticImg = params => ajax(url + '/admin/listStaticImg',params,"GET")

    /**
     * 
     */
    export const reqUpdateStaticImg = params => ajax(url + '/admin/updateStaticImg',params,"POST")





    //?日志管理页面接口
    /**
     * 查询相关日志
     */
    export const reqListLog = params => ajax(url + "/admin/listLog",params,"GET")
    /**
     * 查看日志信息详情
     */
    export const reqGetLogById = params => ajax(url + "/admin/getLogById",params,"GET")



    //?积分管理
    /**
     * 查看所有积分规则
     */
     export const reqAllRules = params => ajax(url + "/admin/listAllRules",params,"GET")
    /**
     * 修改积分规则
     */
     export const reqUpdateRule = params => ajax(url + "/admin/updateRule",params,"POST")



   
  


