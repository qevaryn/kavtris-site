export const qaViewports = {
  mobileSmall: { name: 'mobile-320', width: 320, height: 780 },
  mobile360: { name: 'mobile-360', width: 360, height: 800 },
  mobile375: { name: 'mobile-375', width: 375, height: 812 },
  mobileStandard: { name: 'mobile', width: 390, height: 844 },
  mobile414: { name: 'mobile-414', width: 414, height: 896 },
  mobile430: { name: 'mobile-430', width: 430, height: 932 },
  tablet: { name: 'tablet', width: 768, height: 1024 },
  tabletLandscape: { name: 'tablet-landscape', width: 1024, height: 768 },
  laptop: { name: 'laptop', width: 1280, height: 800 },
  desktop: { name: 'desktop', width: 1440, height: 900 },
  desktopWide: { name: 'desktop-wide', width: 1920, height: 1080 }
} as const;

export const overflowViewports = [
  qaViewports.mobile360,
  qaViewports.mobile375,
  qaViewports.mobileStandard,
  qaViewports.mobile414,
  qaViewports.mobile430,
  qaViewports.tablet,
  qaViewports.tabletLandscape,
  qaViewports.laptop,
  qaViewports.desktop,
  qaViewports.desktopWide
] as const;
