export type PageType = 'home' | 'branch-locator' | 'about-us' | 'management' | 'vision-mission' | 'contact' | 'deaf-accounts' | 'gallery' | 'downloads' | 'financial-reports' | 'deposits' | 'loans' | 'services' | 'login' | 'admin' | 'news';

export const navigationMap: Record<string, PageType> = {
    '#home': 'home',
    '#branch-locator': 'branch-locator',
    '#about': 'about-us',
    '#management': 'management',
    '#bank-objectives': 'vision-mission',
    '#annual-reports': 'financial-reports',
    '#contact': 'contact',
    '#deaf-accounts': 'deaf-accounts',
    '#gallery': 'gallery',
    '#downloads': 'downloads',
    '#deposits': 'deposits',
    '#saving-deposits': 'deposits',
    '#current-deposits': 'deposits',
    '#fixed-deposits': 'deposits',
    '#recurring-deposit': 'deposits',
    '#deposit-rates': 'deposits',
    '#gold-rates': 'deposits',
    '#bulk-rates': 'deposits',
    '#dicgc': 'home',
    '#loans': 'loans',
    '#project-finance': 'loans',
    '#msme-loans': 'loans',
    '#mortgage-loans': 'loans',
    '#home-loan': 'loans',
    '#overdraft-deposit': 'loans',
    '#secured-overdraft': 'loans',
    '#term-deposit': 'loans',
    '#loan-rates': 'loans',
    '#education-loans': 'loans',
    '#swagruha-loan': 'loans',
    '#term-loan-rates': 'loans',
    '#services': 'services',
    '#rtgs': 'services',
    '#neft': 'services',
    '#dd': 'services',
    '#pay-orders': 'services',
    '#digital-banking': 'services',
    '#atm': 'services',
    '#locker': 'services',
    '#service-charges': 'services',
    '#abb': 'services',
    '#admin': 'admin',
    '#login': 'login',
    '#news': 'news',
};

export function getPageFromHash(hash: string): PageType | null {
    // Handle empty hash as home
    if (!hash || hash === '#') return 'home';
    return navigationMap[hash] || null;
}
