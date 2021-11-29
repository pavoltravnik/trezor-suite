import styled from 'styled-components';
import { H1, P, variables, colors, H2, Button, Link } from '@trezor/components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${variables.FONT_SIZE.NORMAL};
`;

export const StyledHeroCta = styled.header`
    text-align: center;
    z-index: 2;
`;

export const StyledCta = styled.div`
    text-align: center;
    justify-content: center;
    margin: 168px 0 140px;
`;

export const DownloadWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const FeaturesWrapper = styled.div`
    margin: 80px 0 0 0;
    & > section {
        margin-bottom: 50px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const StyledH1 = styled(H1)`
    font-size: 28px;
    line-height: 36px;
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};

    @media only screen and (min-width: ${variables.SCREEN_SIZE.MD}) {
        font-size: 44px;
        line-height: 55px;
        white-space: pre-wrap;
    }
`;

export const StyledHeadline = styled(H1)<{ size?: number }>`
    font-size: 40px;
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    line-height: 1.3;
    margin-bottom: 18px;
    em {
        font-style: normal;
        color: ${colors.TYPE_GREEN};
    }

    @media only screen and (min-width: ${variables.SCREEN_SIZE.MD}) {
        font-size: ${props => (props.size !== undefined ? `${props.size}px` : '64px')};
    }
`;

export const StyledSubheadline = styled(P)`
    font-size: 20px;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    color: ${colors.TYPE_LIGHT_GREY} !important;
    margin-bottom: 65px;
`;

export const StyledP = styled(P)`
    && {
        font-size: 20px;
        line-height: 34px;
        font-weight: ${variables.FONT_WEIGHT.MEDIUM};
        color: ${colors.TYPE_LIGHT_GREY};
    }
`;

export const StyledSoon = styled.div`
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    font-weight: ${variables.FONT_WEIGHT.BOLD};
    color: ${colors.TYPE_ORANGE};
`;

export const TranslationModeTrigger = styled.div`
    position: fixed;
    width: 20px;
    height: 20px;
    left: 0px;
    bottom: 0px;
    /* background: red; */
`;

export const FromMytrezorBanner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    background: rgba(245, 179, 0, 0.1);
    border-radius: 40px;
    min-height: 70px;
    padding: 30px;
    margin-bottom: -55px;
    @media all and (max-width: ${variables.SCREEN_SIZE.MD}) {
        flex-direction: column;
    }
`;
export const BannerWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media all and (max-width: ${variables.SCREEN_SIZE.MD}) {
        margin-bottom: 30px;
    }
`;
export const InnerWrap = styled.div`
    padding: 0 30px;
    @media all and (min-width: ${variables.SCREEN_SIZE.SM}) {
        padding: 0 15px;
    }
`;
export const BannerTitle = styled(H2)`
    color: ${colors.TYPE_ORANGE};
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
`;
export const BannerDesc = styled.p`
    color: ${colors.TYPE_LIGHT_GREY};
    font-size: ${variables.FONT_SIZE.H3};
`;
export const BannerCTA = styled(Button)`
    width: 193px;
    height: 60px;
    font-size: ${variables.FONT_SIZE.NORMAL};
    color: ${colors.TYPE_DARK_GREY};
    border-radius: 12px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

export const BannerCTALink = styled(Link)`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    &:hover {
        text-decoration: none;
    }
`;
