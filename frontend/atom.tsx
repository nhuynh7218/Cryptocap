
   
import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil'

// const defaultNullUser: ViewUserDTO = {
// email: 'undefined', firstName: '', followersCount: 0 , followingCount: 0, id: 0, isOrganizer: false, isOwner: false,
// lastName: '', groupBuyListingCount: 0, fanFundListingCount: 0, officalSource: false, reputation: 0, reviewsCount: 0 , subscribedCount: 0, subscribersCount: 0,
// username: ''
// }
export interface UserInfo {
  walletTx: string | null,
  caboBalance: number | null,
}

export const UserAtom =  atom<UserInfo>({
    key: "UserAtom",
    default: {walletTx : null, caboBalance: null}
});
export enum APP_STATE {
    LOADING, SUCCESS, ERROR, CONFIRM, NONE,NOTFOUND, MODAL
}
export const loadingState = atom({
    key: 'loadingState', 
    default: false, 
  });

 
  export const AppState = atom({
    key: 'AppState', 
    default: {appState: APP_STATE.NONE, title: '' , msg: ''}
  });