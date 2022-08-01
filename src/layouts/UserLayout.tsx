// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import jwt_decode from "jwt-decode";
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import { roleUserNavigation, roleHolderNavigation, roleAdminNavigation } from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import router from 'next/router'
import React from 'react'
import { LoginResponse, User } from 'src/models/auth/auth-request'
import { VerticalNavItemsType } from 'src/@core/layouts/types';
import { BalanceRequest, BalanceResponse } from '../models/payments/payment-request';
import { paymentService } from 'src/services/payment-service';

interface Props {
  children: ReactNode
}

interface State {
  userData: User,
  navigation: VerticalNavItemsType,
  balanceData: BalanceResponse,
  loading: boolean
}
const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const [values, setValues] = useState<State>({
    userData: {
      "sub": "",
      "userId": 1,
      "email": "",
      "username": "",
      "role": [
        {
          "id": 3,
          "role": "",
          "certHolderRole": false
        }
      ],
      "iat": 0,
      "exp": 0
    },
    navigation: roleAdminNavigation(),
    balanceData: {
      balance: 0,
      userEmail: ""
    },
    loading: true
  })

  const isUserAuthenticated = (): string => {
    var authdata: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    return authdata ? authdata.accessToken : "";
  }

  const decodeToken = (): User => {
    var authdata: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const token = authdata.accessToken;
    const decoded: User = jwt_decode(token);
    return decoded;
  }

  const getBalanceValue = (balanceRequest: BalanceRequest): any => {
    return paymentService.balance(balanceRequest).then((data) => {
      console.log(data);
      setValues({ ...values, balanceData: data, loading: false })

    }).catch((error: any) => {
      console.log(error);
    })
  }


  const getNavigationFromRole = (userData: User): VerticalNavItemsType => {
    console.log(userData.role[0].role)

    if (userData.role[0].role === 'ROLE_USER') {
      return roleUserNavigation();
    } else if (userData.role[0].role === 'ROLE_HOLDER') {
      return roleHolderNavigation();
    } else if (userData.role[0].role === 'ROLE_ADMIN') {
      return roleAdminNavigation();
    }
    else {
      return roleUserNavigation();
    }
  }

  useEffect(() => {
    // checks if the user is authenticated
    // const returnUrl: string = router.query.returnUrl || '/';
    // console.log(getNavigationFromRole());
    if (isUserAuthenticated()) {
      if (localStorage) {
        var userData = decodeToken();
        console.log(userData);
        setValues({ ...values, userData: userData, navigation: getNavigationFromRole(userData) });
        // getBalanceValue({ userEmail: userData.email });
      }
    } else {
      router.push("/pages/login");
    }
  }, []);


  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))


  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={values.navigation}// Navigation Items
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
          userData={values.userData}
          balanceData={values.balanceData}
        />
      )}
    >
      {children}
      {/* <UpgradeToProButton /> */}
    </VerticalLayout>
  )
}

export default UserLayout

