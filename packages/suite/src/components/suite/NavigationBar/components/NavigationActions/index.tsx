import React, { useMemo } from 'react';
import styled from 'styled-components';
import * as walletSettingsActions from '@settings-actions/walletSettingsActions';
import * as suiteActions from '@suite-actions/suiteActions';
import * as routerActions from '@suite-actions/routerActions';
import { Translation } from '@suite-components';
import { findRouteByName } from '@suite-utils/router';
import { useActions, useAnalytics, useSelector } from '@suite-hooks';
import ActionItem from './components/ActionItem';
import { isDesktop } from '@suite-utils/env';
import NotificationsDropdown from './components/NotificationsDropdown';
import SettingsDropdown from './components/SettingsDropdown';
import TorDropdown from './components/TorDropdown';
import EarlyAccessDropdown from './components/EarlyAccessDropdown';
import { variables } from '@trezor/components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 288px; /* same as DeviceSelector because we need menu in the exact center  */
    justify-content: flex-end;

    @media screen and (max-width: ${variables.SCREEN_SIZE.LG}) {
        margin-left: 24px;
    }
`;

const MobileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 16px;
`;

const ActionItemWrapper = styled.div`
    position: relative;
`;

const Separator = styled.div`
    border: 1px solid ${props => props.theme.STROKE_GREY};
    height: 38px;
    width: 0;
    margin: 0 10px;
    opacity: 0.7;
`;

interface Props {
    closeMainNavigation?: () => void;
    isMobileLayout?: boolean;
}

type Route = 'settings-index' | 'notifications-index';

const NavigationActions = (props: Props) => {
    const analytics = useAnalytics();
    const { activeApp, notifications, discreetMode, tor, allowPrerelease } = useSelector(state => ({
        activeApp: state.router.app,
        notifications: state.notifications,
        discreetMode: state.wallet.settings.discreetMode,
        tor: state.suite.tor,
        theme: state.suite.settings.theme,
        allowPrerelease: state.desktopUpdate.allowPrerelease,
    }));
    const { goto, setDiscreetMode } = useActions({
        goto: routerActions.goto,
        setDiscreetMode: walletSettingsActions.setDiscreetMode,
        setTheme: suiteActions.setTheme,
    });

    const WrapperComponent = props.isMobileLayout ? MobileWrapper : Wrapper;

    // used only in mobile layout
    const gotoWithReport = (routeName: Route) => {
        if (routeName === 'notifications-index') {
            analytics.report({ type: 'menu/goto/notifications-index' });
        } else if (routeName === 'settings-index') {
            analytics.report({ type: 'menu/goto/settings-index' });
        }
        goto(routeName);
    };

    const action = (route: Route) => {
        gotoWithReport(route);
        if (props.closeMainNavigation) props.closeMainNavigation();
    };

    const getIfRouteIsActive = (route: Route) => {
        const routeObj = findRouteByName(route);
        return routeObj ? routeObj.app === activeApp : false;
    };

    const unseenNotifications = useMemo(() => notifications.some(n => !n.seen), [notifications]);

    return (
        <WrapperComponent>
            <ActionItem
                onClick={() => {
                    analytics.report({
                        type: 'menu/toggle-discreet',
                        payload: {
                            value: !discreetMode,
                        },
                    });
                    setDiscreetMode(!discreetMode);
                }}
                isActive={discreetMode}
                label={<Translation id="TR_DISCREET" />}
                icon={discreetMode ? 'HIDE' : 'SHOW'}
                isMobileLayout={props.isMobileLayout}
            />

            {isDesktop() && (
                <>
                    {props.isMobileLayout ? (
                        <ActionItemWrapper>
                            <ActionItem
                                onClick={() => {
                                    analytics.report({
                                        type: 'menu/toggle-tor',
                                        payload: {
                                            value: !tor,
                                        },
                                    });
                                    window.desktopApi!.toggleTor(!tor);
                                }}
                                label={<Translation id="TR_TOR" />}
                                icon="TOR"
                                isMobileLayout={props.isMobileLayout}
                                marginLeft
                                indicator={tor ? 'check' : undefined}
                            />
                        </ActionItemWrapper>
                    ) : (
                        <TorDropdown isActive={tor} marginLeft />
                    )}
                </>
            )}

            {allowPrerelease &&
                (props.isMobileLayout ? (
                    <ActionItem
                        onClick={() => {
                            analytics.report({ type: 'menu/goto/early-access' });
                            action('settings-index');
                        }}
                        label={<Translation id="TR_EARLY_ACCESS_MENU" />}
                        icon="EXPERIMENTAL_FEATURES"
                        isMobileLayout={props.isMobileLayout}
                    />
                ) : (
                    <EarlyAccessDropdown isActive marginLeft />
                ))}

            {!props.isMobileLayout && <Separator />}

            {props.isMobileLayout ? (
                <ActionItem
                    label={<Translation id="TR_NOTIFICATIONS" />}
                    data-test="@suite/menu/notifications-index"
                    onClick={() => action('notifications-index')}
                    isActive={getIfRouteIsActive('notifications-index')}
                    icon="NOTIFICATION"
                    indicator={unseenNotifications ? 'alert' : undefined}
                    isMobileLayout={props.isMobileLayout}
                />
            ) : (
                <NotificationsDropdown
                    indicator={unseenNotifications}
                    isActive={getIfRouteIsActive('notifications-index')}
                />
            )}

            {props.isMobileLayout ? (
                <ActionItem
                    label={<Translation id="TR_SETTINGS" />}
                    data-test="@suite/menu/settings-index"
                    onClick={() => action('settings-index')}
                    isActive={getIfRouteIsActive('settings-index')}
                    icon="SETTINGS"
                    isMobileLayout={props.isMobileLayout}
                />
            ) : (
                <SettingsDropdown isActive={getIfRouteIsActive('settings-index')} marginLeft />
            )}
        </WrapperComponent>
    );
};

export default NavigationActions;
