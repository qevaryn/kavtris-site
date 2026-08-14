import { expect, type Page } from '@playwright/test';

export async function expectNoHorizontalOverflow(page: Page) {
  const diagnostics = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    const windowInnerWidth = window.innerWidth;
    const documentElementScrollWidth = root.scrollWidth;
    const hasOverflow = documentElementScrollWidth > windowInnerWidth;
    const baseDiagnostics = {
      hasOverflow,
      pathname: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      windowInnerWidth,
      windowInnerHeight: window.innerHeight,
      documentElementClientWidth: root.clientWidth,
      documentElementScrollWidth,
      bodyClientWidth: body?.clientWidth ?? null,
      bodyScrollWidth: body?.scrollWidth ?? null,
      visualViewportWidth: window.visualViewport?.width ?? null,
      devicePixelRatio: window.devicePixelRatio,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      documentReadyState: document.readyState,
      documentFontsStatus: document.fonts?.status ?? null,
      rootOverflowVsInnerWidth: documentElementScrollWidth - windowInnerWidth,
      rootOverflowVsClientWidth: documentElementScrollWidth - root.clientWidth,
      bodyOverflowVsInnerWidth: body ? body.scrollWidth - windowInnerWidth : null
    };

    if (!hasOverflow) {
      return {
        ...baseDiagnostics,
        activeAnimationsCount: null,
        animations: [],
        offenders: [],
        ancestorChain: []
      };
    }

    const truncate = (value: string | null, maxLength = 180) => {
      if (!value) {
        return null;
      }
      return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
    };

    const formatRect = (rect: DOMRect) => ({
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
      rightExcess: rect.right - windowInnerWidth,
      leftExcess: 0 - rect.left
    });

    const offenders = Array.from(document.body.querySelectorAll('*'))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0 || (rect.right <= windowInnerWidth && rect.left >= 0)) {
          return null;
        }

        const computed = window.getComputedStyle(element);
        return {
          tagName: element.tagName.toLowerCase(),
          id: element.id || null,
          className: truncate(typeof element.className === 'string' ? element.className : null),
          testId: element.getAttribute('data-testid'),
          role: element.getAttribute('role'),
          rect: formatRect(rect),
          computed: {
            width: computed.width,
            minWidth: computed.minWidth,
            maxWidth: computed.maxWidth,
            position: computed.position,
            display: computed.display,
            overflow: computed.overflow,
            overflowX: computed.overflowX,
            transform: computed.transform,
            boxSizing: computed.boxSizing,
            marginLeft: computed.marginLeft,
            marginRight: computed.marginRight
          },
          horizontalExcess: Math.max(rect.right - windowInnerWidth, 0 - rect.left)
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((first, second) => second.horizontalExcess - first.horizontalExcess)
      .slice(0, 10);

    const worstOffender = offenders[0];
    const ancestorChain = worstOffender
      ? (() => {
          const matches = Array.from(document.body.querySelectorAll('*'))
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                element,
                excess: Math.max(rect.right - windowInnerWidth, 0 - rect.left)
              };
            })
            .filter((item) => item.excess === worstOffender.horizontalExcess);
          const element = matches[0]?.element;
          const chain: Array<{
            tagName: string;
            id: string | null;
            className: string | null;
            testId: string | null;
            role: string | null;
          }> = [];
          let current: Element | null = element ?? null;
          while (current && current !== document.body && chain.length < 8) {
            chain.unshift({
              tagName: current.tagName.toLowerCase(),
              id: current.id || null,
              className: truncate(typeof current.className === 'string' ? current.className : null, 100),
              testId: current.getAttribute('data-testid'),
              role: current.getAttribute('role')
            });
            current = current.parentElement;
          }
          return chain;
        })()
      : [];

    const animations =
      typeof document.getAnimations === 'function'
        ? document
            .getAnimations()
            .filter((animation) => animation.playState === 'running')
            .slice(0, 5)
            .map((animation) => ({
              playState: animation.playState,
              currentTime: animation.currentTime,
              effectTiming: animation.effect?.getTiming
                ? {
                    delay: animation.effect.getTiming().delay,
                    duration: animation.effect.getTiming().duration,
                    endDelay: animation.effect.getTiming().endDelay
                  }
                : null
            }))
        : [];

    return {
      ...baseDiagnostics,
      activeAnimationsCount:
        typeof document.getAnimations === 'function'
          ? document
              .getAnimations()
              .filter((animation) => animation.playState === 'running').length
          : null,
      animations,
      offenders,
      ancestorChain
    };
  });

  expect(
    diagnostics.hasOverflow,
    `Horizontal overflow detected\n${JSON.stringify(diagnostics, null, 2)}`
  ).toBe(false);
}
