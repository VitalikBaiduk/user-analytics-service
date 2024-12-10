"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserAnalytics = exports.setUserLastVisit = exports.setBrandStyleTag = exports.setBrandAgeTag = exports.setPurchasingPower = exports.setUserInterestProduct = exports.setUserInterestBrand = exports.setChildCaregory = exports.setUserInterestCategory = exports.setUserMainCategory = exports.setUserSizeGroup = exports.checkSubscription = exports.setUserEmail = exports.setUserPhone = void 0;
const storage_1 = require("./storage");
const api_1 = require("../api/api");
const analytics_1 = require("../config/analytics");
const RESOURCE = "analytics/events";
const currentDate = Date.now();
const twoWeeks = 1209600000;
const resetStorage = (name) => {
    storage_1.storage.removeItem("analytics_" + name);
};
const isTwoWeeksPassed = (lastUpdate) => {
    return lastUpdate && currentDate - lastUpdate > twoWeeks;
};
const setUserPhone = async (source, value) => {
    const response = await api_1.instanceAPI.post(RESOURCE, {
        events: [{ event: "phone", source, value }],
    });
    return response.data;
};
exports.setUserPhone = setUserPhone;
const setUserEmail = async (source, value) => {
    const response = await api_1.instanceAPI.post(RESOURCE, {
        events: [{ event: "email", source, value }],
    });
    return response.data;
};
exports.setUserEmail = setUserEmail;
const checkSubscription = async (url) => {
    if (!url)
        return;
    const urlParams = new URLSearchParams(new URL(url).search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");
    let result = "";
    if (utmSource) {
        if (utmSource === "UniSender" && utmMedium === "email") {
            result = utmMedium;
        }
        else if (utmCampaign === "channel" || utmMedium === "social") {
            result = utmSource;
        }
        if (result.length) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event: "subscribe", source: null, value: result }],
            });
        }
    }
};
exports.checkSubscription = checkSubscription;
const setUserSizeGroup = async (points, groupName) => {
    const event = "size_group";
    const sizeGroupData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.SIZE_GROUP)) || "{}");
    const updateSizeGroupData = async (group) => {
        sizeGroupData[group] = (sizeGroupData[group] || 0) + points;
        if (sizeGroupData[group] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: group }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(sizeGroupData.last_update)) {
            resetStorage(event);
        }
        else {
            sizeGroupData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.SIZE_GROUP, JSON.stringify(sizeGroupData));
        }
    };
    if (groupName) {
        updateSizeGroupData(groupName);
    }
};
exports.setUserSizeGroup = setUserSizeGroup;
const setUserMainCategory = async (points, mainCategory) => {
    const event = "main_category";
    const mainCategoryData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.MAIN_CATEGORY)) || "{}");
    if (mainCategory) {
        mainCategoryData[mainCategory] =
            (mainCategoryData[mainCategory] || 0) + points;
        if (mainCategoryData[mainCategory] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: mainCategory }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(mainCategoryData.last_update)) {
            resetStorage(event);
        }
        else {
            mainCategoryData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.MAIN_CATEGORY, JSON.stringify(mainCategoryData));
        }
    }
};
exports.setUserMainCategory = setUserMainCategory;
const setUserInterestCategory = async (points, сategoryId) => {
    const event = "interest_category";
    const interestCategoryData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.INTEREST_CATEGORY)) || "{}");
    if (сategoryId) {
        interestCategoryData[сategoryId] =
            (interestCategoryData[сategoryId] || 0) + points;
        if (interestCategoryData[сategoryId] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: сategoryId }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(interestCategoryData.last_update)) {
            resetStorage(event);
        }
        else {
            interestCategoryData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.INTEREST_CATEGORY, JSON.stringify(interestCategoryData));
        }
    }
};
exports.setUserInterestCategory = setUserInterestCategory;
const setChildCaregory = async (childCategory) => {
    const eventMap = {
        Девочкам: "show_girls",
        Мальчикам: "show_boys",
        Новорожденным: "show_newborns",
    };
    if (childCategory) {
        const event = eventMap[childCategory];
        await api_1.instanceAPI.post(RESOURCE, {
            events: [{ event, source: null, value: true }],
        });
        await storage_1.storage.setItem(analytics_1.AnalyticsKeys.USER_CHILD_CATEGORY, JSON.stringify(childCategory));
    }
};
exports.setChildCaregory = setChildCaregory;
const setUserInterestBrand = async (points, brandId) => {
    const event = "interest_brand";
    const interestBrandData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.INTEREST_BRAND)) || "{}");
    if (brandId) {
        interestBrandData[brandId] = (interestBrandData[brandId] || 0) + points;
        if (interestBrandData[brandId] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: brandId }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(interestBrandData.last_update)) {
            resetStorage(event);
        }
        else {
            interestBrandData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.INTEREST_BRAND, JSON.stringify(interestBrandData));
        }
    }
};
exports.setUserInterestBrand = setUserInterestBrand;
const setUserInterestProduct = async (points, productId) => {
    if (!productId) {
        return;
    }
    const event = "interest_product";
    const interestProductData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.INTEREST_PRODUCT)) || "{}");
    if (Object.keys(interestProductData).length <= 20) {
        interestProductData[productId] =
            (interestProductData[productId] || 0) + points;
        if (interestProductData[productId] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: productId }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(interestProductData.last_update)) {
            resetStorage(event);
        }
        else {
            interestProductData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.INTEREST_PRODUCT, JSON.stringify(interestProductData));
        }
    }
};
exports.setUserInterestProduct = setUserInterestProduct;
const setPurchasingPower = async (points, priceGroup) => {
    if (!priceGroup) {
        return;
    }
    const event = "purchasing_power";
    const purchasingPowerData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.PURCHASING_POWER)) || "{}");
    if (Object.keys(purchasingPowerData).length <= 20) {
        purchasingPowerData[priceGroup] =
            (purchasingPowerData[priceGroup] || 0) + points;
        if (purchasingPowerData[priceGroup] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: priceGroup }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(purchasingPowerData.last_update)) {
            resetStorage(event);
        }
        else {
            purchasingPowerData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.PURCHASING_POWER, JSON.stringify(purchasingPowerData));
        }
    }
};
exports.setPurchasingPower = setPurchasingPower;
const setBrandAgeTag = async (points, brandAgeTagId) => {
    const event = "brand_age_tag";
    const brandAgeTagData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.BRAND_AGE_TAG)) || "{}");
    if (Object.keys(brandAgeTagData).length <= 20) {
        brandAgeTagData[brandAgeTagId] =
            (brandAgeTagData[brandAgeTagId] || 0) + points;
        if (brandAgeTagData[brandAgeTagId] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: brandAgeTagId }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(brandAgeTagData.last_update)) {
            resetStorage(event);
        }
        else {
            brandAgeTagData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.BRAND_AGE_TAG, JSON.stringify(brandAgeTagData));
        }
    }
};
exports.setBrandAgeTag = setBrandAgeTag;
const setBrandStyleTag = async (points, brandStyleTagId) => {
    const event = "brand_style_tag";
    const brandStyleTagData = JSON.parse((await storage_1.storage.getItem(analytics_1.AnalyticsKeys.BRAND_STYLE_TAG)) || "{}");
    if (Object.keys(brandStyleTagData).length <= 20) {
        brandStyleTagData[brandStyleTagId] =
            (brandStyleTagData[brandStyleTagId] || 0) + points;
        if (brandStyleTagData[brandStyleTagId] >= 20) {
            await api_1.instanceAPI.post(RESOURCE, {
                events: [{ event, source: null, value: brandStyleTagId }],
            });
            resetStorage(event);
        }
        else if (isTwoWeeksPassed(brandStyleTagData.last_update)) {
            resetStorage(event);
        }
        else {
            brandStyleTagData.last_update = currentDate;
            await storage_1.storage.setItem(analytics_1.AnalyticsKeys.BRAND_STYLE_TAG, JSON.stringify(brandStyleTagData));
        }
    }
};
exports.setBrandStyleTag = setBrandStyleTag;
const setUserLastVisit = async () => {
    function getCurrentDateTime() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const seconds = String(currentDate.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const dateTimeString = getCurrentDateTime();
    const sendTimestamp = async () => {
        await api_1.instanceAPI.post(RESOURCE, {
            events: [
                {
                    event: "last_visit_at",
                    source: null,
                    value: dateTimeString,
                },
            ],
        });
    };
    const initTimestampSending = () => {
        sendTimestamp();
        setInterval(() => {
            sendTimestamp();
        }, 1800000);
    };
    initTimestampSending();
};
exports.setUserLastVisit = setUserLastVisit;
const setUserAnalytics = async (eventsArray) => {
    await api_1.instanceAPI.post(RESOURCE, {
        events: eventsArray
    });
    eventsArray.forEach((event) => {
        resetStorage(event.event);
    });
};
exports.setUserAnalytics = setUserAnalytics;
//# sourceMappingURL=userAnalytics.js.map