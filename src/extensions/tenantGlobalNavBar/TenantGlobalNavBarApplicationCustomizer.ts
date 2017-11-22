import * as React from 'react';
import * as ReactDom from 'react-dom';
import TenantGlobalNavBar from './components/TenantGlobalNavBar';
import { ITenantGlobalNavBarProps } from './components/ITenantGlobalNavBarProps';
import * as SPTermStore from './services/SPTermStoreService';
import pnp from "sp-pnp-js";
import * as strings from 'TenantGlobalNavBarApplicationCustomizerStrings';

const NAV_TERMS_KEY: string = 'global-navigation-terms';
const NavTermSet: string = "NavLinks";

export class NavBarCustomAction {

    public static getSiteCollectionUrl(): string {
        let baseUrl = window.location.protocol + "//" + window.location.host;
        const pathname = window.location.pathname;
        const siteCollectionDetector = "/sites/";
        if (pathname.indexOf(siteCollectionDetector) >= 0) {
            baseUrl += pathname.substring(0, pathname.indexOf("/", siteCollectionDetector.length));
        }
        return baseUrl;
    }

    public static async RenderNavBar(): Promise<void> {

        let _topMenuItems: SPTermStore.ISPTermObject[];
        let siteUrl = NavBarCustomAction.getSiteCollectionUrl();

        pnp.setup({
            defaultCachingStore: "session",
            defaultCachingTimeoutSeconds: 900, //15min
            globalCacheDisable: false // true to disable caching in case of debugging/testing
        });


        let termStoreService: SPTermStore.SPTermStoreService = new SPTermStore.SPTermStoreService({
            siteAbsoluteUrl: siteUrl
        });

        let cachedTerms = pnp.storage.session.get(NAV_TERMS_KEY);
        if (cachedTerms != null) {
            _topMenuItems = cachedTerms;
        }
        else {
            _topMenuItems = await termStoreService.getTermsFromTermSetAsync(NavTermSet);
            pnp.storage.session.put(NAV_TERMS_KEY, _topMenuItems);
        }

        const element: React.ReactElement<ITenantGlobalNavBarProps> = React.createElement(
            TenantGlobalNavBar,
            {
                menuItems: _topMenuItems,
            }
        );

        // Render the react element
        ReactDom.render(element, document.getElementById("divTermSetNav"));

        // Disables the postback on Office UI fabric button. This is an issue with classic pages.
        var navDiv = document.getElementById("divTermSetNav");
        if (navDiv != null) {
            var buttonElements = navDiv.getElementsByTagName("button");
            if (buttonElements && buttonElements.length > 0) {
                for (let i: number = 0; i < buttonElements.length; i++) {
                    if (buttonElements[i]) {
                        buttonElements[i].onclick = function () { return false; };
                    }
                }
            }
        }

        // Add style tag to HEAD to fix the CSS of the flyout div in navigation.
        var css = ' ul.ms-ContextualMenu-list > li > button {margin: 0;}';
        var head = document.head || document.getElementsByTagName('head')[0];
        var style: HTMLStyleElement = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        style.id = 'NavigationFlyoutFix'

        head.appendChild(style);
    }

}

/* Render the top navigation custom action when the DOM is ready */

document.addEventListener("DOMContentLoaded", function (event) {

    var parentElement = document.getElementById("s4-ribbonrow");
    var NavElement = document.createElement("div");
    NavElement.id = "divTermSetNav";
    
    if (parentElement != null) {
        parentElement.insertAdjacentElement('afterend', NavElement);
    }

    NavBarCustomAction.RenderNavBar()
});



