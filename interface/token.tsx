export enum TokenType {
    NATIVE,
    ERC20,
    WRAPPED
}

export default interface TokenInterface {
    name: string,
    address: string,
    symbol: string,
    decimals: number,
    chainId: number,
    logoURI: string,
    type?: TokenType
}