export declare const setUserPhone: (source: string, value: string) => Promise<any>;
export declare const setUserEmail: (source: string, value: string) => Promise<any>;
export declare const checkSubscription: (url: string | undefined) => Promise<void>;
export declare const setUserSizeGroup: (points: number, groupName: string | null) => Promise<void>;
export declare const setUserMainCategory: (points: number, mainCategory: string | number | null) => Promise<void>;
export declare const setUserInterestCategory: (points: number, сategoryId: string | number | null) => Promise<void>;
export declare const setChildCaregory: (childCategory: string | null) => Promise<void>;
export declare const setUserInterestBrand: (points: number, brandId: number | null) => Promise<void>;
export declare const setUserInterestProduct: (points: number, productId: number | undefined) => Promise<void>;
export declare const setPurchasingPower: (points: number, priceGroup: string | undefined) => Promise<void>;
export declare const setBrandAgeTag: (points: number, brandAgeTagId: number) => Promise<void>;
export declare const setBrandStyleTag: (points: number, brandStyleTagId: number) => Promise<void>;
export declare const setUserLastVisit: () => Promise<void>;
export declare const setUserAnalytics: (eventsArray: Array<{
    event: string;
    source: null;
    value: string | number | null;
}>) => Promise<void>;
//# sourceMappingURL=userAnalytics.d.ts.map