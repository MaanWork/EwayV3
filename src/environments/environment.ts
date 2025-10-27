export const environment = {
    production: false,
    "ApiUrl1": "http://102.69.166.162:8086/EwayAdminApi/",
    "MotorApiUrl": "http://102.69.166.162:8086/EwayMotorApi/",
    "CommonApiUrl": "http://102.69.166.162:8086/EwayCommonApi/",
    "CustomCommonApiUrl": "http://102.69.166.162:8086/EwayCommonApi/",
    "ExcelUrl": "http://102.69.166.162:8086/EwayAdminApi/",
    "PreExceptionUrl":"http://102.69.166.162:8086/WhatsAppApiLive/",
    "CustomApiUrl1": "http://102.69.166.162:8086/EwayAdminApi/",
    "MarineApi": "http://102.69.166.162:8086/MarineApi/",
     "ReInsurance":"http://193.203.162.152:8084/",
     "CRMApiUrl":"http://172.17.0.28:8080/EwayAdminApi/",
    productionConfig: {},
};
if (environment.production) {
  Object.assign(environment, environment.productionConfig);
}
