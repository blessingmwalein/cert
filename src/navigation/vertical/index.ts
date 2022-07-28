// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import AccountDetails from 'mdi-material-ui/AccountDetails';
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import AccountCheckOutline from 'mdi-material-ui/AccountCheckOutline';
import AccountCashOutline from 'mdi-material-ui/AccountCashOutline';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import AccountEditOutline from 'mdi-material-ui/AccountEditOutline';
import AccountDetailsOutline from 'mdi-material-ui/AccountDetailsOutline';

const roleUserNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    {
      sectionTitle: 'Verifications'
    },
    {
      title: 'User Verifications',
      icon: AccountDetails,
      path: '/pages/verifications/user',
      // openInNewTab: true
    },
    {
      title: 'Verify',
      icon: AccountCheckOutline,
      path: '/pages/verifications/user/verify',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Payments'
    },
    {
      title: 'Balance',
      icon: AccountCashOutline,
      path: '/pages/payments',
      // openInNewTab: true
    },
    {
      title: 'Payment',
      icon: CurrencyUsd,
      path: '/pages/payments/send',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Security'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}


const roleHolderNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    {
      sectionTitle: 'Applications'
    },
    {
      title: 'Apply',
      icon: AccountDetailsOutline,
      path: '/applications/holder/apply',
      // openInNewTab: true
    },
    {
      title: 'Update',
      icon: AccountEditOutline,
      path: '/applications/holder/update',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Payments'
    },
    {
      title: 'Balance',
      icon: AccountCashOutline,
      path: '/payments',
      // openInNewTab: true
    },
    {
      title: 'Payment',
      icon: CurrencyUsd,
      path: '/payments/send',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Security'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
  ]
}

const roleAdminNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    {
      sectionTitle: 'Applications'
    },
    {
      title: 'All',
      icon: AccountCheckOutline,
      path: '/pages/applications/admin',
      // openInNewTab: true
    },
    {
      title: 'Approve',
      icon: AccountCheckOutline,
      path: '/pages/applications/admin/approve',
      // openInNewTab: true
    },
    {
      title: 'Reject',
      icon: AccountCheckOutline,
      path: '/pages/applications/admin/reject',
      // openInNewTab: true
    },
    {
      title: 'Institution Applications',
      icon: AccountCheckOutline,
      path: '/pages/applications/admin/institutions',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Certificates'
    },
    {
      title: 'All',
      icon: AccountCheckOutline,
      path: '/pages/certificates/admin',
      // openInNewTab: true
    },
    {
      title: 'Approve',
      icon: AccountCheckOutline,
      path: '/pages/certificates/admin/create',
      // openInNewTab: true
    },
    {
      title: 'Reject',
      icon: AccountCheckOutline,
      path: '/pages/certificates/admin/reject',
      // openInNewTab: true
    },
    {
      title: 'Sign',
      icon: AccountCheckOutline,
      path: '/pages/certificates/admin/sign',
      // openInNewTab: true
    },
    {
      title: 'Update',
      icon: AccountCheckOutline,
      path: '/pages/certificates/admin/update',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Verifications'
    },
    {
      title: 'All',
      icon: AccountCheckOutline,
      path: '/pages/verifications/admin',
      // openInNewTab: true
    },
    {
      title: 'Institution Verifications',
      icon: AccountCheckOutline,
      path: '/pages/verifications/admin/institution',
      // openInNewTab: true
    },

    {
      sectionTitle: 'Security'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },

  ]
}

export { roleUserNavigation, roleHolderNavigation, roleAdminNavigation }

