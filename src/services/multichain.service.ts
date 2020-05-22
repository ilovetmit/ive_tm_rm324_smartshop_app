import Axios from "axios";

const MUTLICHAIN_NODE = 'http://192.168.0.107:5786';
const CHAIN_NAME = 'VitCoinChain';

export default class MutlichainService {

    static sendRequestToNode = async (method: String, params: any[]): Promise<any> => {
        let result = null;
        try {
            let response = await Axios.post(MUTLICHAIN_NODE, {
                "method": method,
                "params": params,
                "chain_name": CHAIN_NAME
            }, {
                headers: { 'Authorization': 'Basic bXVsdGljaGFpbnJwYzoyQUsxQTNkS0pDRG40cGZkTEFxM1hYNkJzRE12SmlZR2tNWjVRWE5xaFZlZw==' }
            })

            if (response.status === 200) {
                result = response.data;
            } else {
                console.log('MutlichainService Network Error');
            }
        } catch (error) {
            console.log('MutlichainService SendRequest Function Error');
        }
        return result;
    }

    static createRawSendFrom = async (address: string, coin: number, sign: string): Promise<string> => {
        let response = await MutlichainService.sendRequestToNode('createrawsendfrom', [address, { [address]: { "issuemore": { "asset": "VitCoin", "raw": coin } } }, [sign]]);
        return response.result;
    };

    static getWalletInformation = async (): Promise<object> => {
        Axios.post(HOST_NAME + HOST_API_VER, {
        }).then((response) => {
            //
        }).catch((error) => {
            //
        });
    };
}