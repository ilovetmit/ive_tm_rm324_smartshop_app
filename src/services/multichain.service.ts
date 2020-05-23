import Axios from "axios";
import { AsyncStorage } from 'react-native';

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
                headers: { 'Authorization': 'Basic bXVsdGljaGFpbnJwYzoyQUsxQTNkS0pDRG40cGZkTEFxM1hYNkJzRE12SmlZR2tNWjVRWE5xaFZlZw==' },
                validateStatus: (status) => { return true; }
            })

            if (response.status === 200) {
                result = response.data;
            } else {
                console.log(`MutlichainService Error with method ${method}: ` + JSON.stringify(response.data));
            }
        } catch (error) {
            console.log('MutlichainService Unexcepted Error');
        }

        return result;
    }

    static sendrawtransaction = async (wallet: object, coin: number, sign: string): Promise<string> => {
        let result = null;

        let rawHexData = (await MutlichainService.sendRequestToNode('createrawsendfrom', [wallet.address, { [wallet.address]: { "issuemore": { "asset": "Vitcoin", "raw": coin } } }, [sign]])).result;

        let signedRawHexData = (await MutlichainService.sendRequestToNode('signrawtransaction', [rawHexData, [], [wallet.primary_key]])).result.hex;

        let response = await MutlichainService.sendRequestToNode('sendrawtransaction', [signedRawHexData]);

        if (response.error == null) {
            result = response.result;
            console.log(response.result);
        } else {
            console.log('sendrawtransaction error');
        }
        return result;
    };

    static getWalletInformation = async (): Promise<object> => {
        let result = null;
        Axios.post(HOST_NAME + HOST_API_VER + 'wallet', {
        }).then(async (response) => {
            result = response.data;
            // await AsyncStorage.setItem('privateKey', response.data.privateKey);
            // await AsyncStorage.setItem('address', response.data.address);
        }).catch((error) => {
            console.log('MutlichainService getWalletInformation Network Error');
        });
        return result;
    };
}