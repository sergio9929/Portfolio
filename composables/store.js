export const useStartupFinished = () => useState('startupFinished', () => false)
export const useFooterVisible = () => useState('footerVisible', () => false)
export const useCurrentElement = () => useState('currentElement', () => 0)
export const useHeaderTheme = () => useState('headerTheme', () => '')