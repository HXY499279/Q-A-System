//?所有接口的封装类


import ajax from './ajax'


  /**
   * 登录
   */
   export const reqLogin = params => ajax('/admin/login', params, "POST")

   //?统计数据接口
  /**
   * 今日数据请求函数
  */
   export const reqTodayData = params => ajax('/admin/todayStatistic', params, "GET")

  /**
   * 志愿者相关
   */
  export const reqVolunteer = params => ajax('/admin/getVolunteerStatistic', params, "GET")

  /**
   * 学科相关
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
   */
   export const reqListQuestion = params => ajax('/admin/listQuestion', params, "GET")
  /**
   * 修改问题
   */
   export const reqUpdateQuestion = params => ajax('/admin/updateQuestion', params, "POST")
  /**
   * 隐藏问题 
   */
   export const reqDisapperQuestion = params => ajax('/admin/disappearQuestion', params, "POST")
  /**
   * 查看提问者信息
   */
   export const reqGetAccountById = params => ajax('/account/getAccountById', params, "GET")
   /**
    * 详情页_问题
    */
    export const reqGetQuestionById = params => ajax('/question/getQuestionById', params, "GET")
   /**
    * 详情页_问题
    */
    export const reqGetQuestionById2 = params => ajax('/admin/listQuestionDetail', params, "GET")

   //?用户管理页面接口
   /**
    * 查询相关用户
    */
    export const reqListAccount = params => ajax('/admin/listAccount', params, "GET")
    /**
     * 获取全部学科信息
     */
    export const reqListAllSubject = params => ajax('/admin/listAllSubject', params, "GET")
     /**
     * 修改用户角色
     */
      export const reqUpdateAccountRole = params => ajax('/admin/updateAccountRole', params, "POST")

   
    

    //?资讯管理页面接口
    /**
     * 查询相关咨询
     */
     export const reqListNews = params => ajax('/admin/listNews', params, "GET")
     /**
      * 添加新的咨询
      */
      export const reqAddNews = params => ajax('/admin/addNews', params, "POST")
      /**
       * 删除咨询
       */
       export const reqDeleteNewsById = params => ajax('/admin/deleteNewsById', params, "POST")
       /**
        * 修改咨询
        */
        export const reqUpdateNews = params => ajax('/admin/updateNews', params, "POST")
        /**
         * 查看资讯详情
         */
         export const reqGetNews = params => ajax('/admin/getNews', params, "GET")



   //?学科管理页面请求接口
   /**
    * 获取全部学院 
    */
    export const reqGetAllCollege = params => ajax('/admin/getAllCollege', params, "GET")
    /**
     * 查询相关学科
     */
     export const reqListSubject = params => ajax('/admin/listSubject', params, "GET")
     /**
      * 添加学科
      */
      export const reqAddSubject = params => ajax('/admin/addSubject', params, "POST")
      /**
       * 查询学科详情
       */
       export const reqGetSubjectById = params => ajax('/admin/getSubjectById', params, "GET")
       /**
        * 修改学科信息
        */
        export const reqUpdateSubject = params => ajax('/admin/updateSubject', params, "POST")
        /**
         * 删除学科
         */
         export const reqDeleteSubject = params => ajax('/admin/deleteSubject', params, "GET")
  


    //?举报和反馈页面接口
    /**
     * 举报查询 
     */
    export const reqListReport = params => ajax("/admin/listReport",params,"GET")

    /**
     * 查看举报信息详情 
     */
     export const reqGetReportById = params => ajax("/admin/getReportById",params,"GET")

     /**
      * 隐藏举报信息
      */
      export const reqDeleteReportById = params => ajax("/admin/deleteReportById",params,"POST")

      /**
       * 反馈查询
       */
       export const reqListFeedback = params => ajax("/admin/listFeedback",params,"GET")
       /**
        * 隐藏反馈信息 
        */
        export const reqDeleteFeedbackById = params => ajax("/admin/deleteFeedbackById",params,"POST")
        /**
         * 解决反馈
         */
         export const reqUpdateFeedbackState = params => ajax("/admin/updateFeedbackState",params,"POST")
         /**
          * 查看反馈
          */
          export const reqGetFeedback = params => ajax("/admin/getFeedback",params,"GET")

    //?界面管理接口
    /**
     * 查看所有图片 
     */
    export const reqListStaticImg = params => ajax('/admin/listStaticImg',params,"GET")

    /**
     * 
     */
    export const reqUpdateStaticImg = params => ajax('/admin/updateStaticImg',params,"POST")





    //?日志管理页面接口
    /**
     * 查询相关日志
     */
    export const reqListLog = params => ajax("/admin/listLog",params,"GET")
    /**
     * 查看日志信息详情
     */
    export const reqGetLogById = params => ajax("/admin/getLogById",params,"GET")


   
  


