import { Languages } from '@suite-types/languages';

export const LANGUAGES: Languages = [
    { code: 'en', name: 'English', en: 'English' },
    { code: 'bn', name: 'Bengali', en: 'Bengali' },
    { code: 'cs', name: 'Česky', en: 'Czech' },
    { code: 'de', name: 'Deutsch', en: 'German' },
    { code: 'el', name: 'Ελληνικά', en: 'Greek' },
    { code: 'es', name: 'Español', en: 'Spanish' },
    { code: 'fr', name: 'Français', en: 'French' },
    { code: 'id', name: 'Bahasa Indonesia', en: 'Indonesian' },
    { code: 'it', name: 'Italiano', en: 'Italian' },
    { code: 'ja', name: '日本語', en: 'Japanese' },
    { code: 'nl', name: 'Nederlands', en: 'Dutch' },
    { code: 'pl', name: 'Polski', en: 'Polish' },
    { code: 'pt', name: 'Português', en: 'Portuguese' },
    { code: 'ru', name: 'Русский', en: 'Russian' },
    { code: 'uk', name: 'Українська', en: 'Ukrainian' },
    { code: 'zh', name: '中文(简体)', en: 'Chinese Simplified' },
    { code: 'zh-TW', name: '中文(台灣)', en: 'Chinese Traditional' },
];

export const FIAT_CURRENCIES = [
    'usd',
    'aed',
    'ars',
    'aud',
    'bdt',
    'bhd',
    'bmd',
    'brl',
    'cad',
    'chf',
    'clp',
    'cny',
    'czk',
    'dkk',
    'eur',
    'gbp',
    'hkd',
    'huf',
    'idr',
    'ils',
    'inr',
    'jpy',
    'krw',
    'kwd',
    'lkr',
    'mmk',
    'mxn',
    'myr',
    'nok',
    'nzd',
    'php',
    'pkr',
    'pln',
    'rub',
    'sar',
    'sek',
    'sgd',
    'thb',
    'try',
    'twd',
    'vef',
    'vnd',
    'zar',
    'xdr',
    'xag',
    'xau',
];

export const SETTINGS = {
    MAX_ACCOUNTS: 10,
};

export const EXTERNAL_COINS = [
    {
        id: 'btc',
        coinName: 'Bitcoin',
        url: '../?coin=btc',
        order: 1,
    },
    {
        id: 'bch',
        coinName: 'Bitcoin Cash',
        url: '../?coin=bch',
        order: 6,
    },
    {
        id: 'btg',
        coinName: 'Bitcoin Gold',
        url: '../?coin=btg',
        order: 27,
    },
    {
        id: 'dash',
        coinName: 'Dash',
        url: '../?coin=dash',
        order: 15,
    },
    {
        id: 'dgb',
        coinName: 'DigiByte',
        url: '../?coin=dgb',
        order: 42,
    },
    {
        id: 'doge',
        coinName: 'Dogecoin',
        url: '../?coin=doge',
        order: 26,
    },
    {
        id: 'ltc',
        coinName: 'Litecoin',
        url: '../?coin=ltc',
        order: 5,
    },
    {
        id: 'nmc',
        coinName: 'Namecoin',
        url: '../?coin=nmc',
        order: 255,
    },
    {
        id: 'vtc',
        coinName: 'Vertcoin',
        url: '../?coin=vtc',
        order: 154,
    },
    {
        id: 'zec',
        coinName: 'Zcash',
        url: '../?coin=zec',
        order: 20,
    },
    {
        id: 'xem',
        coinName: 'NEM',
        url: 'https://nem.io/downloads/',
        external: true,
        order: 19,
    },
    {
        id: 'xlm',
        coinName: 'Stellar',
        url: 'https://trezor.io/stellar',
        external: true,
        order: 9,
    },
    {
        id: 'ada',
        coinName: 'Cardano',
        url: 'https://adalite.io/app',
        external: true,
        order: 12,
    },
    {
        id: 'xtz',
        coinName: 'Tezos',
        url: 'https://wallet.simplestaking.com/tezos/wallet/start',
        external: true,
        order: 21,
    },
];
