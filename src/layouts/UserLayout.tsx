// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import jwt_decode from "jwt-decode";
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ** Navigation Imports
import { roleUserNavigation, roleHolderNavigation, roleAdminNavigation, roleRegisterNavigation } from 'src/navigation/vertical'

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
import { authService } from '../services/auth.service';
import { log } from 'console';


interface Props {
  children: ReactNode
}

interface State {
  navigation: VerticalNavItemsType,
  balanceData: BalanceResponse,
  loading: boolean
}
const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const [navigation, setNavigation] = useState<VerticalNavItemsType>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log("Token is expired");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState<Boolean>(true)
  const [userData, setUserData] = useState<User>({
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
  },)

  const [balanceData, setBalanceData] = useState<any>({})

  const isUserAuthenticated = (): string => {
    var authdata: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    return authdata ? authdata.accessToken : "";
  }

  const getBalanceValue = (balanceRequest: BalanceRequest): any => {
    return paymentService.balance().then((data) => {
      console.log(data);
      setBalanceData(data)
      setLoading(false);
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
    } else if (userData.role[0].role === 'ROLE_REGISTRAR') {
      console.log("ROLE_REGISTRAR zvaita");

      return roleRegisterNavigation();
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
        var userData = authService.decodeToken();
        console.log(new Date().getTime());

        if (new Date().getTime() < userData.exp * 1000) {
          console.log(userData);
          setUserData(userData);
          setNavigation(getNavigationFromRole(userData));
          getBalanceValue({ userEmail: userData.email });
        } else {
          // authService.clearLocalStorage();
          // 
          handleClickOpen()
          setTimeout(() => {
            router.push("/pages/login");
          }
            , 3000);
        }
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
   *  to know more about what loading can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return !loading ? (
    <><Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Session expired?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your session has  expired you will be logged out in 10 seconds!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Logout</Button>
        <Button onClick={handleClose} autoFocus>
          Refresh Token
        </Button>
      </DialogActions>
    </Dialog><VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={navigation} // Navigation Items
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
          userData={userData}
          balanceData={balanceData} />
      )}
    >
        {children}
        {/* <UpgradeToProButton /> */}

      </VerticalLayout></>


  ) : (<div></div>)
}

export default UserLayout

