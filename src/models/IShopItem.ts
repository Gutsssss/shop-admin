export interface IShopItem {
    id:number,
    name:string,
    price:number,
    rating?:number,
    img:string,
    createdAt?:Date | string,
    updatedAr?:Date | string,
    typeId:number,
    brandId:number,
    messageText?:string | unknown
}