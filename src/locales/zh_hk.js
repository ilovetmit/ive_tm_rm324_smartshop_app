import React from "react";

const zh_hk = {

    // *******************
    // global
    // *******************
    success: '成功',
    no: '不',
    yes: '是',
    save: '保存',
    submit: '提交',
    confirm: '確認',
    cancel: '取消',
    error: '错误',
    back: '返回',
    unexpected_error: '未知錯誤',
    network_error: '網絡錯誤',
    unfilled: '未填寫',
    unknown: '未知',
    bate: '測試版',
    copyright: 'Copyright © 2019 S-SHOP@TMIT 版權所有',


    // *******************
    // login screen
    // *******************
    email: '電子郵箱',
    email_valid: '請輸入正確的電郵地址',
    password_valid: '請輸入密碼',
    password: '密碼',
    login: '登入',
    new_here: '新用戶?',
    create_account: '創建賬號',


    // *******************
    // register screen
    // *******************
    selectedTypeValid: '請選擇用戶類別!',
    sign_up: '註冊',
    whoAreYou: '你是誰 ?',
    proprietor: '業主',
    householder: '住戶',
    tenant: '租戶',
    first_name: '名',
    firstNameValid: '你的名字不能為空',
    lastNameValid: '你的姓氏不能為空',
    last_name: '姓',
    name: '姓名',
    // email: -> login screen,
    emailValid: '請輸入正確的電郵地址',
    // password: -> login screen,
    passwordValid: '密碼需要最少6位',
    c_password: '確認密碼',
    confirmationPasswordValid: '密碼不一致',
    alreadyAccountText: '已有賬號？',
    login_here: '按此登入',


    // *******************
    // drawer menu
    // *******************
    // smart_home: -> home screen
    service: '服務',
    support: '協助',
    contact_us: '聯絡我們',
    about: '關於',
    settings: '設置',
    logout: '登出',


    // *******************
    // main tab
    // *******************
    home: '主頁',
    news: '消息',
    me: '我的',


    // *******************
    // home screen
    // *******************
    latest_news: '最新資訊',
    w_update_time: '更新時間',
    smart_home: '智能家居',
    leasing_service: '租賃服務',
    taxi_booking: '預約的士',
    facility_booking: '設施預約',
    smart_locker: '智能儲物櫃',
    service_request: '服務請求',
    fee: '管理費',
    more: '更多',
    weather_nine_day: '9天天氣預報',
    housing_estate_info: '屋苑資訊',


    // *******************
    // news screen
    // *******************
    news_header: '消息',
    urgent:'緊急消息',
    info: '資訊',
    general: '一般消息',
    no_news: '暫時沒有任何消息',


    // *******************
    // me screen
    // *******************
    management_fee: '管理費',
    house: '房子',
    parking_space: '停車位',
    booking: '預約記錄',
    feedback: '建議或反饋',
    // contact_us: -> drawer menu
    // about: -> drawer menu
    // settings: -> drawer menu
    // logout: -> drawer menu


    // *******************
    // user screen
    // *******************
    account_header: '賬號',
    identity: '身份',
    // email: -> login screen,
    en_name: '英文姓名',
    cn_name: '中文姓名',
    gender: '性別',
    dob: '出生日期',
    phone: '聯絡電話',
    change_password: '更改密碼',


    // *******************
    // parking spcae screen
    // *******************
    parking_space_header: '停車位',


    // *******************
    // house spcae screen
    // *******************
    house_header: '房子',


    // *******************
    // profile screen
    // *******************
    // chinese name ***************
    cn_name_header: '編輯 - 中文姓名',
    surname: '姓氏',
    surnameValid: '你的中文姓氏不能為空',
    forename: '名字',
    forenameValid: '你的中文名字不能為空',
    // english name ***************
    en_name_header: '編輯 - 英文姓名',
    // first_name: -> register screen
    // firstNameValid: -> register screen
    // last_name: -> register screen
    // lastNameValid: -> register screen
    // dob ************************
    dobValid: '請選擇出生日期',
    // dob: -> user screen
    // Gender *********************
    gender_header: '編輯 - 性別',
    male: '男性',
    female: '女性',
    // phone **********************
    phone_header: '編輯 - 電話號碼',
    phoneValid: '電話號碼最少8位數',
    phoneNumber: '電話號碼',
    // change password ************
    msg_current_password_wrong: '當前密碼錯誤。 請檢查並重新輸入',
    msg_change_password: '更改密碼成功，請重新登入',
    change_password_header: '更改密碼',
    current_password: '當前密碼',
    passwordCurrentValid: '請輸入目前密碼',
    new_password: '新密碼',
    // passwordValid: ->register screen,
    confirm_password: '確認密碼',
    passwordConfirmedValid: '密碼不一致',


    // *******************
    // feedback screen
    // *******************
    feedbackTypeValid: '請選擇類別!',
    create_feedback_header: '創建 - 建議或反饋',
    feedback_header: '建議或反饋',
    title: '標題',
    titleValid: '請輸入標題',
    feedback_type: '反饋類別',
    choose_feedback_type: '--- 選擇 類別 ---',
    content: '內容',
    contentValid: '請輸入內容',
    remark: '備註',
    created_at: '創建時間',
    support_status: {
        open: '開放',
        completed: '完成',
        closed: '關閉',
        cancel: '取消',
        unknown: '未知',
    },
    // TODO feedback type option


    // *******************
    // request screen
    // *******************
    requestTypeValid: '請選擇類別!',
    create_request_header: '創建 - 服務請求',
    request_header: '服務請求',
    location: '服務位置',
    locationValid: '請輸入具體位置',
    request_type: '請求類別',
    // TODO request type option


    // *******************
    // management fee screen
    // *******************
    management_fee_header: '管理費',
    // management_fee: -> me screen,
    repair_fund: '維修基金',
    management_fee_status: {
        pending: '未繳交',
        complete: '完成',
        arrears: '欠款',
        expired: '過期',
        cancel: '取消',
        unknown: '未知',
    },


    // *******************
    // facility booking screen
    // *******************
    booking_header: '設施預約',
    create_booking: '創建 - 預約申請',
    bookingDateValid: '請選擇預約日期!',
    bookingTimeValid: '請選擇預約時間!',
    booking_date: '預約日期',
    choose_date: '選擇日期',
    booking_time: '預約時間',
    num_of_user: '參與人數',
    edit_booking: '編輯預約申請',
    cancel_booking: '取消預約',
    booking_status: {
        requesting: '申請中',
        allow: '成功',
        reject: '拒絕',
        cancel: '取消',
        unknown: '未知',
    },
    cancel_booking_msg: '您要取消預訂嗎？ 該步驟無法取消！',
    // TODO facility option

    // *******************
    // settings screen
    // *******************
    settings_header: '設置',
    s_language: '語言與地區',
    // language ************
    language_header: '語言與地區',
    zh_hk: "繁體中文",
    zh_cn: "简体中文",
    en_us: "English",
    change_language_content: '您將語言從 {{origin}} 更改為 {{new}}?',
    change_language_success: '請重新啟動程序以更改設置',


    // *******************
    // message
    // *******************
    msg_re_login: '登入記錄過期，請重新登入',
    msg_network_error: '網絡連接失敗，請稍後再試',
    no_record: '沒有任何記錄',
    update_success: '更新成功',
    create_success: '創建成功',
    operation_success: '操作成功！',
    coming_soon: '敬請期待',


};

export default zh_hk;
