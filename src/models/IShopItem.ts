import type { UploadFile } from "antd";

export interface IShopItem {
    id?:number,
    name:string,
    price:number | string,
    rating?:number,
    img:UploadFile | null,
    info?:string,
    createdAt?:Date | string,
    updatedAr?:Date | string,
    typeId:number | string,
    brandId:number | string,
}