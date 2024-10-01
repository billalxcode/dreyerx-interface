import { Abi, AbiFunction, AbiEvent } from 'viem';

// Tipe untuk event Approval
const approvalEvent: AbiEvent = {
    anonymous: false,
    inputs: [
        { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
};

// Tipe untuk event Burn
const burnEvent: AbiEvent = {
    anonymous: false,
    inputs: [
        { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
        { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'Burn',
    type: 'event'
};

// Tipe untuk event Mint
const mintEvent: AbiEvent = {
    anonymous: false,
    inputs: [
        { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amount0', type: 'uint256' },
        { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' }
    ],
    name: 'Mint',
    type: 'event'
};

// Tipe untuk event Swap
const swapEvent: AbiEvent = {
    anonymous: false,
    inputs: [
        { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amount0In', type: 'uint256' },
        { indexed: false, internalType: 'uint256', name: 'amount1In', type: 'uint256' },
        { indexed: false, internalType: 'uint256', name: 'amount0Out', type: 'uint256' },
        { indexed: false, internalType: 'uint256', name: 'amount1Out', type: 'uint256' },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'Swap',
    type: 'event'
};

// Tipe untuk event Sync
const syncEvent: AbiEvent = {
    anonymous: false,
    inputs: [
        { indexed: false, internalType: 'uint112', name: 'reserve0', type: 'uint112' },
        { indexed: false, internalType: 'uint112', name: 'reserve1', type: 'uint112' }
    ],
    name: 'Sync',
    type: 'event'
};

// Tipe untuk event Transfer
const transferEvent: AbiEvent = {
    anonymous: false,
    inputs: [
        { indexed: true, internalType: 'address', name: 'from', type: 'address' },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
};

// Tipe untuk fungsi-fungsi
const domainSeparatorFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const minimumLiquidityFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const permitTypehashFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const allowanceFunction: AbiFunction = {
    constant: true,
    inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const approveFunction: AbiFunction = {
    constant: false,
    inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
};

const balanceOfFunction: AbiFunction = {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const burnFunction: AbiFunction = {
    constant: false,
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'burn',
    outputs: [
        { internalType: 'uint256', name: 'amount0', type: 'uint256' },
        { internalType: 'uint256', name: 'amount1', type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
};

const decimalsFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const factoryFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'factory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const getReservesFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'getReserves',
    outputs: [
        { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
        { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
        { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

const initializeFunction: AbiFunction = {
    constant: false,
    inputs: [
        { internalType: 'address', name: '_token0', type: 'address' },
        { internalType: 'address', name: '_token1', type: 'address' }
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
};

// Anda bisa menambahkan sisa fungsi dan event sesuai kebutuhan di sini...

// ABI lengkap
const UniswapV2PairAbi: Abi = [
    approvalEvent,
    burnEvent,
    mintEvent,
    swapEvent,
    syncEvent,
    transferEvent,
    domainSeparatorFunction,
    minimumLiquidityFunction,
    permitTypehashFunction,
    allowanceFunction,
    approveFunction,
    balanceOfFunction,
    burnFunction,
    decimalsFunction,
    factoryFunction,
    getReservesFunction,
    initializeFunction,
    // tambahkan fungsi lainnya di sini
];

export default UniswapV2PairAbi;
