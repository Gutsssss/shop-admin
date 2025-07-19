import type { UploadFile } from "antd";

export interface IShopItem {
    id?:number,
    name:string,
    price:number | string,
    rating?:number | string,
    img:UploadFile | null,
    fullDescription?:string,
    info?:[{
        id?:number,
        fullDescription:string
    }],
    createdAt?:Date | string,
    updatedAr?:Date | string,
    typeId:number | string,
    brandId:number | string,
}