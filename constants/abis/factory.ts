import { Abi, AbiFunction, AbiEvent } from 'viem';

// Tipe untuk event PairCreated
const pairCreatedEvent: AbiEvent = {
    anonymous: false,
    inputs: [
        { indexed: true, internalType: 'address', name: 'token0', type: 'address' },
        { indexed: true, internalType: 'address', name: 'token1', type: 'address' },
        { indexed: false, internalType: 'address', name: 'pair', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'pairIndex', type: 'uint256' }
    ],
    name: 'PairCreated',
    type: 'event'
};

// Tipe untuk fungsi allPairs
const allPairsFunction: AbiFunction = {
    constant: true,
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'allPairs',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

// Tipe untuk fungsi allPairsLength
const allPairsLengthFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'allPairsLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

// Tipe untuk fungsi createPair
const createPairFunction: AbiFunction = {
    constant: false,
    inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' }
    ],
    name: 'createPair',
    outputs: [{ internalType: 'address', name: 'pair', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
};

// Tipe untuk fungsi feeTo
const feeToFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'feeTo',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

// Tipe untuk fungsi feeToSetter
const feeToSetterFunction: AbiFunction = {
    constant: true,
    inputs: [],
    name: 'feeToSetter',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

// Tipe untuk fungsi getPair
const getPairFunction: AbiFunction = {
    constant: true,
    inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' }
    ],
    name: 'getPair',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
};

// Tipe untuk fungsi setFeeTo
const setFeeToFunction: AbiFunction = {
    constant: false,
    inputs: [{ internalType: 'address', name: '_feeTo', type: 'address' }],
    name: 'setFeeTo',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
};

// Tipe untuk fungsi setFeeToSetter
const setFeeToSetterFunction: AbiFunction = {
    constant: false,
    inputs: [{ internalType: 'address', name: '_feeToSetter', type: 'address' }],
    name: 'setFeeToSetter',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
};

// ABI lengkap untuk Uniswap V2 Factory
const UniswapV2FactoryAbi: Abi = [
    pairCreatedEvent,
    allPairsFunction,
    allPairsLengthFunction,
    createPairFunction,
    feeToFunction,
    feeToSetterFunction,
    getPairFunction,
    setFeeToFunction,
    setFeeToSetterFunction
];

export default UniswapV2FactoryAbi;
