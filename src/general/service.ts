
export const customResponse = (status: number,message: string,data: any) => {    
    return {
        status,
        message,
        data
    }
}