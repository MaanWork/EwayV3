export const environment = {
    production: false,
    "ApiUrl1": "http://192.168.1.42:8084/",
       "MotorApiUrl": "http://192.168.1.42:8085/",
       "CommonApiUrl": "http://192.168.1.42:8086/",
       "CustomCommonApiUrl": "http://192.168.1.42:8086/",
        "CustomCommonCalcApiUrl": "http://192.168.1.42:8086/",
       "ExcelUrl": "http://192.168.1.42:8084/",
       "PreExceptionUrl":"https://madison.revioncloud.com/WhatsAppChatApi/",
       "CustomApiUrl1": "http://192.168.1.42:8084/",
        "MarineApi": "http://102.69.166.162:8086/MarineApi/",
      "ReInsurance":"http://193.203.162.152:8084/",
      "CRMApiUrl":"http://172.17.0.28:8080/EwayAdminApi/",
    productionConfig: {},
};
if (environment.production) {
  Object.assign(environment, environment.productionConfig);
}
