import React from "react";

const en_us = {

    // *******************
    // global
    // *******************
    success: 'Succeed',
    no: 'NO',
    yes: 'YES',
    save: 'SAVE',
    submit: 'SUBMIT',
    confirm: 'Confirm',
    cancel: 'Cancel',
    error: 'Error',
    unexpected_error: 'Unexpected Error',
    network_error: 'Network Error',
    unfilled: 'Unfilled',
    unknown: 'Unknown',
    bate: 'Bate',
    copyright: 'Copyright © 2019 S-SHOP@TMIT All rights reserved',


    // *******************
    // login screen
    // *******************
    email: 'Email',
    email_valid: 'Please enter a valid email address',
    password_valid: 'Please enter password',
    password: 'Password',
    login: 'LOG IN',
    new_here: 'New here?',
    create_account: 'Create an Account',


    // *******************
    // register screen
    // *******************
    selectedTypeValid: 'Please select user type!',
    sign_up: 'SIGN UP',
    name: 'Name',
    nameValid: 'Your name can\'t be blank',
    // email: -> login screen,
    emailValid: 'Please enter a valid email address',
    // password: -> login screen,
    passwordValid: 'Please enter at least 6 characters',
    c_password: 'Confirm Password',
    confirmationPasswordValid: 'The password fields are not identical',
    alreadyAccountText: 'Already have an account.',
    login_here: 'Login here',


    // *******************
    // drawer menu
    // *******************
    // smart_home: -> home screen
    service: 'Service',
    support: 'Support',
    contact_us: 'Contacts',
    about: 'About',
    settings: 'Settings',
    logout: 'Logout',


    // *******************
    // main tab
    // *******************
    home: 'Home',
    news: 'News',
    me: 'Me',


    // *******************
    // home screen
    // *******************
    latest_news: 'Latest News',
    w_update_time: 'Update Time',
    smart_home: 'Smart Home',
    leasing_service: 'Leasing Service',
    taxi_booking: 'Taxi Booking',
    facility_booking: 'Facility Booking',
    smart_locker: 'Smart Locker',
    service_request: 'Service Request',
    fee: 'Fee',
    more: 'More',
    weather_nine_day: '9-Day Weather Forecast',
    housing_estate_info: 'Housing Estate Info',


    // *******************
    // news screen
    // *******************
    news_header: 'NEWS',
    urgent:'Urgent',
    info: 'Info',
    general: 'General',
    no_news: 'No news for the time being.',


    // *******************
    // me screen
    // *******************
    management_fee: 'Management Fee',
    house: 'House',
    parking_space: 'Parking Space',
    booking: 'Booking',
    feedback: 'Suggestion & Feedback',
    // contact_us: -> drawer menu
    // about: -> drawer menu
    // settings: -> drawer menu
    // logout: -> drawer menu


    // *******************
    // user screen
    // *******************
    account_header: 'ACCOUNT',
    identity: 'Identity',
    // email: -> login screen,
    en_name: 'English Name',
    cn_name: 'Chinese Name',
    gender: 'Gender',
    dob: 'Date of birth',
    phone: 'Phone',
    change_password: 'Change Password',


    // *******************
    // parking spcae screen
    // *******************
    parking_space_header: 'PARKING SPACE',


    // *******************
    // house spcae screen
    // *******************
    house_header: 'HOUSE',


    // *******************
    // profile screen
    // *******************
    // chinese name ***************
    cn_name_header: 'EDIT - CN NAME',
    surname: 'Surname',
    surnameValid: 'Your surname can\'t be blank',
    forename: 'Forename',
    forenameValid: 'Your forename can\'t be blank',
    // english name ***************
    en_name_header: 'EDIT - EN NAME',
    // first_name: -> register screen
    // firstNameValid: -> register screen
    // last_name: -> register screen
    // lastNameValid: -> register screen
    // dob ************************
    dobValid: 'Please select a date',
    // dob: -> user screen
    // Gender *********************
    gender_header: 'EDIT - GENDER',
    male: 'Male',
    female: 'Female',
    // phone **********************
    phone_header: 'EDIT - PHONE',
    phoneValid: 'The phone number must be at least 8 digits.',
    phoneNumber: 'Phone Number',
    // change password ************
    msg_current_password_wrong: 'The current password is incorrect. Please check and re-enter.',
    msg_change_password: 'Change password success, please re-login',
    change_password_header: 'CHANGE PASSWORD',
    current_password: 'Current Password',
    passwordCurrentValid: 'Your current password can\'t be blank',
    new_password: 'New Password',
    // passwordValid: ->register screen,
    confirm_password: 'Confirm Password',
    passwordConfirmedValid: 'Your password must be same',


    // *******************
    // feedback screen
    // *******************
    feedbackTypeValid: 'Please choose feedback type!',
    create_feedback_header: 'CREATE - FEEDBACK',
    feedback_header: 'FEEDBACK',
    title: 'Title',
    titleValid: 'Title can\'t be blank',
    feedback_type: 'Feedback Type',
    choose_feedback_type: '--- Choose type ---',
    content: 'Content',
    contentValid: 'Content can\'t be blank',
    remark: 'Remark',
    created_at: 'Created at',
    support_status: {
        open: 'Open',
        completed: 'Completed',
        closed: 'Closed',
        cancel: 'Cancel',
        unknown: 'Unknown',
    },
    // TODO feedback type option


    // *******************
    // request screen
    // *******************
    requestTypeValid: 'Please choose request type!',
    create_request_header: 'CREATE - REQUEST',
    request_header: 'REQUEST',
    location: 'Location',
    locationValid: 'Location can\'t be blank',
    request_type: 'Request Type',
    // TODO request type option


    // *******************
    // management fee screen
    // *******************
    management_fee_header: 'MANAGEMENT FEE',
    // management_fee: -> me screen,
    repair_fund: 'Repair Fund',
    management_fee_status: {
        pending: 'Pending',
        complete: 'Complete',
        arrears: 'Arrears',
        expired: 'Expired',
        cancel: 'Cancel',
        unknown: 'Unknown',
    },


    // *******************
    // facility booking screen
    // *******************
    booking_header: 'BOOKING',
    create_booking: 'CREATE - BOOKING',
    bookingDateValid: 'Please choose booking date!',
    bookingTimeValid: 'Please choose booking Time!',
    booking_date: 'Booking Date',
    choose_date: 'Choose Date',
    booking_time: 'Booking Time',
    num_of_user: 'Num Of User',
    edit_booking: 'Edit Booking',
    cancel_booking: 'Cancel Booking',
    booking_status: {
        requesting: 'Requesting',
        allow: 'Allow',
        reject: 'Reject',
        cancel: 'Cancel',
        unknown: 'Unknown',
    },
    cancel_booking_msg: 'Do you want to cancel your booking? The steps cannot be canceled!',
    // TODO facility option

    // *******************
    // settings screen
    // *******************
    settings_header: 'SETTINGS',
    s_language: 'Language',
    // language ************
    language_header: 'LANGUAGE',
    zh_hk: "繁體中文",
    zh_cn: "简体中文",
    en_us: "English",
    change_language_content: 'Do you really want to change the language from {{origin}} to {{new}}?',
    change_language_success: 'Please restart the program to change the settings.',


    // *******************
    // message
    // *******************
    msg_re_login: 'Login record expired\nPlease login again',
    msg_network_error: 'Network connection failed\nTry again later.',
    no_record: 'You do not have record yet.',
    update_success: 'Update Successful',
    create_success: 'Create Successful',
    operation_success: 'Successful operation!',
    coming_soon: 'Coming Soon',


};

export default en_us;
