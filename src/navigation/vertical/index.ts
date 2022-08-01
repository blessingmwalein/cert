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
import AccountAlertOutline from 'mdi-material-ui/AccountAlertOutline';
import { Draw } from 'mdi-material-ui'

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
      path: '/verifications/user',
      // openInNewTab: true
    },
    {
      title: 'Verify',
      icon: AccountCheckOutline,
      path: '/verifications/user/verify',
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
      icon: AccountDetailsOutline,
      path: '/applications/admin',
      // openInNewTab: true
    },
    {
      title: 'Approve',
      icon: AccountCheckOutline,
      path: '/applications/admin/approve',
      // openInNewTab: true
    },
    {
      title: 'Reject',
      icon: AccountAlertOutline,
      path: '/applications/admin/reject',
      // openInNewTab: true
    },
    // {
    //   title: 'Institution Applications',
    //   icon: AccountDetailsOutline,
    //   path: '/applications/admin/institutions',
    //   // openInNewTab: true
    // },
    {
      sectionTitle: 'Certificates'
    },
    {
      title: 'All',
      icon: AccountDetailsOutline,
      path: '/certificates/admin',
      // openInNewTab: true
    },
    {
      title: 'Create',
      icon: AccountCheckOutline,
      path: '/certificates/admin/create',
      // openInNewTab: true
    },
    {
      title: 'Update',
      icon: AccountEditOutline,
      path: '/certificates/admin/update',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Verifications'
    },
    {
      title: 'All',
      icon: AccountCheckOutline,
      path: '/verifications/admin',
      // openInNewTab: true
    },
    // {
    //   title: 'Institution Verifications',
    //   icon: AccountCheckOutline,
    //   path: '/verifications/admin/institution',
    //   // openInNewTab: true
    // },

    {
      sectionTitle: 'Security'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Create User',
      icon: AccountPlusOutline,
      path: '/create-user'
    },

  ]
}
const roleRegisterNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    {
      sectionTitle: 'Applications'
    },
    // {
    //   title: 'All',
    //   icon: AccountDetailsOutline,
    //   path: '/applications/admin',
    //   // openInNewTab: true
    // },
    {
      title: 'Approve',
      icon: AccountCheckOutline,
      path: '/applications/admin/approve',
      // openInNewTab: true
    },
    {
      title: 'Reject',
      icon: AccountAlertOutline,
      path: '/applications/admin/reject',
      // openInNewTab: true
    },
    {
      title: 'Institution Applications',
      icon: AccountDetailsOutline,
      path: '/applications/admin/institution',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Certificates'
    },
    // {
    //   title: 'All',
    //   icon: AccountDetailsOutline,
    //   path: '/certificates/admin',
    //   // openInNewTab: true
    // },
    {
      title: 'Create',
      icon: AccountCheckOutline,
      path: '/certificates/admin/create',
      // openInNewTab: true
    },
    {
      title: 'Update',
      icon: AccountEditOutline,
      path: '/certificates/admin/update',
      // openInNewTab: true
    },
    {
      title: 'Institution Applications',
      icon: AccountDetailsOutline,
      path: '/certificates/admin/institution',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Verifications'
    },
    // {
    //   title: 'All',
    //   icon: AccountCheckOutline,
    //   path: '/verifications/admin',
    //   // openInNewTab: true
    // },
    {
      title: 'Institution Verifications',
      icon: AccountCheckOutline,
      path: '/verifications/admin/institution',
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

export { roleUserNavigation, roleHolderNavigation, roleAdminNavigation, roleRegisterNavigation }

