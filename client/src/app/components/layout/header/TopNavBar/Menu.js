const navigation = [
  { key: 'home', name: 'בית', href: '/', current: false,requiredLogin:false,ShowInMenu:true },
  { key: 'coupons', name: 'קופונים שלי', href: '/coupons', current: false,requiredLogin:true,ShowInMenu:true },
  // { key: 'account', name: 'החשבון שלי', href: '/auth/account', current: false,requiredLogin:true,ShowInMenu:true },
  { key: 'contact', name: 'יצירת קשר', href: '/contact', current: false,requiredLogin:false,ShowInMenu:true },
  { key: 'about', name: 'אודות', href: '/about', current: false,requiredLogin:false,ShowInMenu:true },
  { key: 'pricing', name: 'מחירון', href: '/pricing', current: false,requiredLogin:false,ShowInMenu:true },
  { key: 'share', name: 'שיתוף', href: '/coupons/share', current: false,requiredLogin:false,ShowInMenu:false },
]
const userNavigation = [
  { key: 'account', name: 'החשבון שלי', href: '/auth/account',requiredLogin:true,ShowInMenu:true },
  { key: 'login', name: 'התחברות', href: '/auth/login',requiredLogin:false,ShowInMenu:true,onClick:null },
  { key: 'register', name: 'הרשמה', href: '/auth/register',requiredLogin:false,ShowInMenu:true,onClick:null },
  { key: 'logout', name: 'התנתקות', href: '/',requiredLogin:true,ShowInMenu:true,onClick:null },
]
export { navigation, userNavigation }
