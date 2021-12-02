/* eslint-disable max-classes-per-file */
import { LastWeekRates, TickerId } from '@wallet-types/fiatRates';
import FIAT_CONFIG from '@suite-config/fiat';
import { differenceInMilliseconds } from 'date-fns';

// a proxy for https://api.coingecko.com/api/v3
const COINGECKO_API_BASE_URL = 'https://cdn.trezor.io/dynamic/coingecko/api/v3';

interface HistoricalResponse extends LastWeekRates {
    symbol: string;
}

class RateLimiter {
    // Poor man's coingecko rate limiter
    // Slows down requests so there is `delayMs` gap between them
    private delayMs: number; // gap between each request
    private lastFetchTimestamp: number;
    private queued: number; // how many requests are waiting to be fired
    private totalDelay: number; // by how much time are we gonna slown down next request

    constructor(delayMs: number) {
        this.delayMs = delayMs;

        this.lastFetchTimestamp = 0;
        this.queued = 0;
        this.totalDelay = 0;
    }

    async limit<T>(fn: () => Promise<T>): Promise<T> {
        const msSinceLastFetch = differenceInMilliseconds(
            new Date().getTime(),
            this.lastFetchTimestamp,
        );
        if (msSinceLastFetch < this.delayMs) {
            this.queued += 1;
            this.totalDelay += this.delayMs;
            // dummy wait for this.totalDelay before we fire next request
            await new Promise(resolve => setTimeout(resolve, this.totalDelay)); // slow down firing next request
        }

        this.lastFetchTimestamp = new Date().getTime();
        const results = await fn();
        this.queued -= 1;
        if (this.queued === 0) {
            // if all queued requests were fired, we need to reset totalDelay to properly delay next batch of requests
            this.totalDelay = 0;
        }
        return results;
    }
}

const rateLimiter = new RateLimiter(1000);

const fetchCoinGecko = async (url: string) => {
    try {
        const res = await rateLimiter.limit(() => fetch(url));
        if (!res.ok) {
            console.warn(`Fiat rates failed to fetch: ${res.status}`);
            return;
        }
        return res.json();
    } catch (error) {
        // Do not report to Sentry to save the issues count limit.
        console.warn(error);
    }
};

export const getTickerConfig = (ticker: TickerId) =>
    // for token find its main network
    FIAT_CONFIG.tickers.find(t =>
        ticker.tokenAddress ? t.symbol === ticker.mainNetworkSymbol : t.symbol === ticker.symbol,
    );

/**
 * Build coinUrl using defined coin ids
 *
 * @param {TickerId} ticker
 * @returns
 */
const buildCoinUrl = (ticker: TickerId) => {
    const config = getTickerConfig(ticker);
    if (!config) {
        console.error('buildCoinUrl: cannot find ticker config for ', ticker);
        return null;
    }

    return `${COINGECKO_API_BASE_URL}/coins/${config.coingeckoId}`;
};

/**
 * Returns the current rate for a given token fetched from CoinGecko API.
 * Returns null if main network for the token is not ethereum.
 * Supports only tokens on ethereum.
 *
 * @param {TickerId} ticker
 * @returns
 */
export const fetchCurrentTokenFiatRates = async (ticker: TickerId) => {
    if (!ticker.tokenAddress) return null;

    const networkTickerConfig = getTickerConfig(ticker);
    if (!networkTickerConfig || networkTickerConfig?.coingeckoId !== 'ethereum') {
        console.warn('fetchCurrentTokenFiatRates: This API supports only ethereum', ticker);
        return null;
    }

    const url = `${COINGECKO_API_BASE_URL}/simple/token_price/${
        networkTickerConfig.coingeckoId
    }?contract_addresses=${ticker.tokenAddress}&vs_currencies=${FIAT_CONFIG.currencies.join(',')}`;

    const rates = await fetchCoinGecko(url);
    if (!rates) return null;

    return {
        ts: new Date().getTime() / 1000,
        rates: rates[ticker.tokenAddress.toLowerCase()],
    };
};

/**
 * Returns the current rate for a given symbol fetched from CoinGecko API.
 * Returns null if coin for a given symbol was not found.
 *
 * @param {TickerId} ticker
 * @returns
 */
export const fetchCurrentFiatRates = async (ticker: TickerId) => {
    const coinUrl = buildCoinUrl(ticker);
    if (!coinUrl) return null;
    const urlParams =
        'tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';
    const url = `${coinUrl}?${urlParams}`;

    const rates = await fetchCoinGecko(url);
    if (!rates) return null;

    return {
        ts: new Date().getTime() / 1000,
        rates: rates.market_data?.current_price,
    };
};

const FIAT_RATES = [
    [0, 135.3],
    [1367107200, 135.3],
    [1369699200, 129.179],
    [1372377600, 99.66],
    [1374969600, 94.005],
    [1377561600, 125.67],
    [1380153600, 128.02],
    [1382745600, 178.96],
    [1385337600, 793.07],
    [1387929600, 668.74],
    [1390521600, 808.32],
    [1393113600, 622.97],
    [1395705600, 582.55],
    [1398297600, 494.2733],
    [1400889600, 523.1083],
    [1403481600, 586.1482999999998],
    [1406073600, 617.9425000000001],
    [1408665600, 515.8263000000001],
    [1411257600, 396.62],
    [1413849600, 382.4137999999999],
    [1416441600, 355.3888345541618],
    [1419033600, 328.7740000000001],
    [1421625600, 214.545],
    [1424304000, 240.2988],
    [1426896000, 259.4899],
    [1429488000, 224.3086],
    [1432080000, 234.048],
    [1434672000, 242.9967],
    [1437264000, 272.806179588859],
    [1439856000, 253.0766],
    [1442448000, 232.746],
    [1445040000, 270.3646],
    [1447632000, 331.353],
    [1450224000, 453.9139999999999],
    [1452816000, 365.912],
    [1455408000, 404.1440000000001],
    [1458000000, 415.6410000000001],
    [1460592000, 424.932],
    [1463184000, 455.5030000000001],
    [1465776000, 704.2918521711082],
    [1468368000, 658.1500000000001],
    [1470960000, 586.5299999999999],
    [1473552000, 605.3154151790802],
    [1476144000, 640.7],
    [1478736000, 713.2141433353438],
    [1481328000, 773.1262933845235],
    [1483920000, 901.8788880390637],
    [1486512000, 1055.3013],
    [1489104000, 1100.0105899712148],
    [1491696000, 1187.6989999999998],
    [1494288000, 1700.1775],
    [1496965161, 2824.2038],
    [1499472000, 2563.19551359687],
    [1502064000, 3356.70973808691],
    [1504656000, 4592.25027789782],
    [1507248000, 4347.54723950876],
    [1509840000, 7416.26795098255],
    [1512432000, 12174.2537397926],
    [1515024000, 15976.365194174],
    [1517616000, 8830.16351005472],
    [1520208000, 11286.6762891691],
    [1522800000, 7464.35609406668],
    [1525392000, 9551.13518381566],
    [1527984000, 7567.51293761927],
    [1530576000, 6595.5473128085],
    [1533168000, 7612.300753683117],
    [1535760000, 7027.631279401852],
    [1538352000, 6626.037956098487],
    [1540944000, 6331.781807909807],
    [1543536000, 4279.475592548712],
    [1546128000, 3778.193939889601],
    [1548720000, 3432.215668301249],
    [1551312000, 3813.377891881294],
    [1553904000, 4103.322859513963],
    [1556496000, 5257.803249232503],
    [1559088000, 8726.978110456395],
    [1561680000, 11178.682998186501],
    [1564272000, 9447.678401413306],
    [1566864000, 10334.911854471331],
    [1569456000, 8446.244115548528],
    [1572048000, 8652.030029867461],
    [1574640000, 6935.73862740252],
    [1577232000, 7266.60819662888],
    [1579824000, 8415.956027335538],
    [1582416000, 9658.606058375473],
    [1585008000, 6456.347485963419],
    [1587600000, 7109.995291181778],
    [1590192000, 9131.767275081993],
    [1592784000, 9298.360829121417],
    [1595376000, 9384.379751903267],
    [1597968000, 11861.83657727968],
    [1600560000, 11083.99836119821],
    [1603152000, 11752.146863919786],
    [1605744000, 17829.934958345126],
    [1608336000, 23120.57055156752],
    [1610928000, 35804.263885674685],
    [1613520000, 49238.13690672487],
    [1616112000, 57922.40959262911],
    [1618704000, 60273.86667694734],
    [1621296000, 43780.82559782485],
    [1623888000, 38321.454656574206],
    [1626480000, 31399.653128682126],
    [1629072000, 47025.00323011282],
    [1631664000, 47135.43199562694],
    [1634256000, 57452.43178503547],
    [1636848000, 64660.33535267343],
];

const interpolateUsdForTimestamp = (timestamp: number) => {
    const index = FIAT_RATES.findIndex(
        ([ts], i, arr) => ts <= timestamp && i < arr.length - 1 && arr[i + 1][0] > timestamp,
    );
    if (index < 0) return FIAT_RATES[FIAT_RATES.length - 1][1];
    const [loTs, loRate] = FIAT_RATES[index];
    const [hiTs, hiRate] = FIAT_RATES[index + 1];
    const ratio = (timestamp - loTs) / (hiTs - loTs);
    return loRate * ratio + hiRate * (1 - ratio);
};

/**
 * Returns the historical rate for a given symbol, timestamp fetched from CoinGecko API.
 * Be aware that the data granularity is 1 day.
 * Returns null if coin for a given symbol was not found.
 *
 * @param {TickerId} ticker
 * @param {number[]} timestamps
 * @returns
 */
export const getFiatRatesForTimestamps = async (
    ticker: TickerId,
    timestamps: number[],
): Promise<HistoricalResponse | null> => {
    const coinUrl = buildCoinUrl(ticker);
    const urlEndpoint = `history`;
    if (!coinUrl) return null;

    // TODO temporary hack to not bombarding coingecko with fiat rate requests
    return {
        symbol: ticker.symbol,
        tickers: timestamps.map(ts => ({ ts, rates: { usd: interpolateUsdForTimestamp(ts) } })),
        ts: new Date().getTime(),
    };

    const url = `${coinUrl}/${urlEndpoint}`;

    const promises = timestamps.map(async t => {
        const d = new Date(t * 1000);
        const dateParam = `${d.getUTCDate()}-${d.getUTCMonth() + 1}-${d.getUTCFullYear()}`;

        const data = await fetchCoinGecko(`${url}?date=${dateParam}`);
        return {
            ts: t,
            rates: data?.market_data?.current_price,
        };
    });

    const results = await Promise.all(promises);
    return {
        symbol: ticker.symbol,
        tickers: results,
        ts: new Date().getTime(),
    };
};

/**
 * Returns the historical rates for the past 7 days
 * Be aware that the data granularity is 1 day.
 * Returns null if coin for a given symbol was not found.
 *
 * @param {TickerId} ticker
 * @param {string} localCurrency
 * @returns {(Promise<HistoricalResponse | null>)}
 */
export const fetchLastWeekRates = async (
    ticker: TickerId,
    localCurrency: string,
): Promise<HistoricalResponse | null> => {
    const urlEndpoint = `market_chart`;
    const urlParams = `vs_currency=${localCurrency}&days=7`;
    const coinUrl = buildCoinUrl(ticker);
    if (!coinUrl) return null;

    const { symbol } = ticker;
    const url = `${coinUrl}/${urlEndpoint}?${urlParams}`;
    const data = await fetchCoinGecko(url);
    const tickers = data?.prices?.map((d: any) => ({
        ts: Math.floor(d[0] / 1000),
        rates: { [localCurrency]: d[1] },
    }));
    if (!tickers) return null;

    return {
        symbol,
        tickers,
        ts: new Date().getTime(),
    };
};
