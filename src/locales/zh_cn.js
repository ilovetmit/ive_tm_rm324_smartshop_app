import React from "react";

const zh_cn = {

    // *******************
    // global
    // *******************
    success: '成功',
    no: '不',
    yes: '是',
    save: '保存',
    confirm: '确认',
    cancel: '取消',
    error: '錯誤',
    unexpected_error: '未知错误',
    network_error: '网络错误',
    unfilled: '未填写',
    unknown: '未知',
    bate: '测试版',
    copyright: 'Copyright © 2019 S-SHOP@TMIT 版权所有',


    // *******************
    // login screen
    // *******************
    email: '电子邮箱',
    email_valid: '请输入正确的电邮地址',
    password_valid: '请输入密码',
    password: '密码',
    login: '登入',
    new_here: '新用户?',
    create_account: '创建账号',


    // *******************
    // register screen
    // *******************
    selectedTypeValid: '请选择用户类别!',
    sign_up: '注册',
    whoAreYou: '你是谁 ?',
    proprietor: '业主',
    householder: '住户',
    tenant: '租户',
    first_name: '名',
    firstNameValid: '你的名字不能为空',
    lastNameValid: '你的姓氏不能为空',
    last_name: '姓',
    name: '姓名',
    // email: -> login screen,
    emailValid: '请输入正确的电邮地址',
    // password: -> login screen,
    passwordValid: '密码需要最少6位',
    c_password: '确认密码',
    confirmationPasswordValid: '密码不一致',
    alreadyAccountText: '已有账号？ ',
    login_here: '按此登入',


    // *******************
    // drawer menu
    // *******************
    // smart_home: -> home screen
    service: '服务',
    support: '协助',
    contact_us: '联络我们',
    about: '关于',
    settings: '设置',
    logout: '登出',


    // *******************
    // main tab
    // *******************
    home: '主页',
    news: '消息',
    me: '我的',


    // *******************
    // home screen
    // *******************
    latest_news: '最新资讯',
    w_update_time: '更新时间',
    smart_home: '智能家居',
    leasing_service: '租赁服务',
    taxi_booking: '预约的士',
    facility_booking: '设施预约',
    smart_locker: '智能储物柜',
    service_request: '服务请求',
    fee: '管理费',
    more: '更多',
    weather_nine_day: '9天天气预报',
    housing_estate_info: '屋苑资讯',


    // *******************
    // news screen
    // *******************
    news_header: '消息',
    urgent:'紧急消息',
    info: '资讯',
    general: '一般消息',
    no_news: '暂时没有任何消息',


    // *******************
    // me screen
    // *******************
    management_fee: '管理费',
    house: '房子',
    parking_space: '停车位',
    booking: '预约记录',
    feedback: '建议或反馈',
    // contact_us: -> drawer menu
    // about: -> drawer menu
    // settings: -> drawer menu
    // logout: -> drawer menu


    // *******************
    // user screen
    // *******************
    account_header: '账号',
    identity: '身份',
    // email: -> login screen,
    en_name: '英文姓名',
    cn_name: '中文姓名',
    gender: '性别',
    dob: '出生日期',
    phone: '联络电话',
    change_password: '更改密码',


    // *******************
    // parking spcae screen
    // *******************
    parking_space_header: '停车位',


    // *******************
    // house spcae screen
    // *******************
    house_header: '房子',


    // *******************
    // profile screen
    // *******************
    // chinese name ***************
    cn_name_header: '编辑 - 中文姓名',
    surname: '姓氏',
    surnameValid: '你的中文姓氏不能为空',
    forename: '名字',
    forenameValid: '你的中文名字不能为空',
    // english name ***************
    en_name_header: '编辑 - 英文姓名',
    // first_name: -> register screen
    // firstNameValid: -> register screen
    // last_name: -> register screen
    // lastNameValid: -> register screen
    // dob ************************
    dobValid: '请选择出生日期',
    // dob: -> user screen
    // Gender *********************
    gender_header: '编辑 - 性别',
    male: '男性',
    female: '女性',
    // phone **********************
    phone_header: '编辑 - 电话号码',
    phoneValid: '电话号码最少8位数',
    phoneNumber: '电话号码',
    // change password ************
    msg_current_password_wrong: '当前密码错误。 请检查并重新输入',
    msg_change_password: '更改密码成功，请重新登入',
    change_password_header: '更改密码',
    current_password: '当前密码',
    passwordCurrentValid: '请输入目前密码',
    new_password: '新密码',
    // passwordValid: ->register screen,
    confirm_password: '确认密码',
    passwordConfirmedValid: '密码不一致',


    // *******************
    // feedback screen
    // *******************
    feedbackTypeValid: '请选择类别!',
    create_feedback_header: '创建 - 建议或反馈',
    feedback_header: '建议或反馈',
    title: '标题',
    titleValid: '请输入标题',
    feedback_type: '反馈类别',
    choose_feedback_type: '--- 选择 类别 ---',
    content: '内容',
    contentValid: '请输入内容',
    remark: '备注',
    created_at: '创建时间',
    support_status: {
        open: '开放',
        completed: '完成',
        closed: '关闭',
        cancel: '取消',
        unknown: '未知',
    },
    // TODO feedback type option


    // *******************
    // request screen
    // *******************
    requestTypeValid: '请选择类别!',
    create_request_header: '创建 - 服务请求',
    request_header: '服务请求',
    location: '服务位置',
    locationValid: '请输入具体位置',
    request_type: '请求类别',
    // TODO request type option


    // *******************
    // management fee screen
    // *******************
    management_fee_header: '管理费',
    // management_fee: -> me screen,
    repair_fund: '维修基金',
    management_fee_status: {
        pending: '未缴交',
        complete: '完成',
        arrears: '欠款',
        expired: '过期',
        cancel: '取消',
        unknown: '未知',
    },


    // *******************
    // facility booking screen
    // *******************
    booking_header: '设施预约',
    create_booking: '创建 - 预约申请',
    bookingDateValid: '请选择预约日期!',
    bookingTimeValid: '请选择预约时间!',
    booking_date: '预约日期',
    choose_date: '选择日期',
    booking_time: '预约时间',
    num_of_user: '参与人数',
    edit_booking: '编辑预约申请',
    cancel_booking: '取消预约',
    booking_status: {
        requesting: '申请中',
        allow: '成功',
        reject: '拒绝',
        cancel: '取消',
        unknown: '未知',
    },
    cancel_booking_msg: '您要取消预订吗？该步骤无法取消！',
    // TODO facility option

    // *******************
    // settings screen
    // *******************
    settings_header: '设置',
    s_language: '语言与地区',
    // language ************
    language_header: '语言与地区',
    zh_hk: "繁體中文",
    zh_cn: "简体中文",
    en_us: "English",
    change_language_content: '您要将语言从 {{origin}} 更改为 {{new}}?',
    change_language_success: '请重新启动程序以更改设置',


    // *******************
    // message
    // *******************
    msg_re_login: '登入记录过期，请重新登入',
    msg_network_error: '网络连接失败，请稍后再试',
    no_record: '没有任何记录',
    update_success: '更新成功',
    create_success: '创建成功',
    operation_success: '操作成功！',
    coming_soon: '敬请期待',


};

export default zh_cn;
