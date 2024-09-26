import TokenInterface, { TokenType } from "@/interface/token";
import { ChainId, JSBI, Percent } from "@dreyerxswap/v2-sdk"
import { zeroAddress } from "viem";

export const ROUTER_ADDRESS = "0xB1a0EAf384C32Aae60df8EE9CAAD683105a06Ce1" as `0x${string}`;

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

export const DREYERX_EXPLORER_URL = 'https://scan.dreyerx.com'

export const NATIVE_TOKEN: TokenInterface = {
    chainId: ChainId.MAINNET,
    name: 'DreyerX Native',
    decimals: 18,
    address: zeroAddress,
    logoURI: 'https://raw.githubusercontent.com/dreyerx-swap/assets/main/tokenlist/0x69Ca138041e4D3C5De4eC45268f462E9881A06BA/logo.png',
    symbol: 'DRX',
    type: TokenType.NATIVE
}