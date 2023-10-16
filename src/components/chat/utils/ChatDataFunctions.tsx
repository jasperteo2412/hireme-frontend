export function transformChatHistory(...args: any){

    const [
        data
    ] = args;

    return data.map((item: any, index: number) => {

        const sentDateTime = new Date(item.sentDateTime);
        const readIndicator = item.readIndicator === 'N'? false : true;
        const messageBody = item.messageBody;
        const sentTo = item.sentTo;
        const sentFrom = item.sentFrom;
        
        return {
            messageBody,
            sentDateTime,
            readIndicator,
            sentTo,
            sentFrom
        }
    });
}