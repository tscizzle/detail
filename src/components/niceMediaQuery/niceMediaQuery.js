import React from 'react';
import MediaQuery from 'react-responsive';

import { MOBILE_DESKTOP_SPLIT } from '../../constants/constants';


export const MobileOnly = ({ children }) => (
  <MediaQuery maxDeviceWidth={MOBILE_DESKTOP_SPLIT}>
    {children}
  </MediaQuery>
)

export const DesktopOnly = ({ children }) => (
  <MediaQuery minDeviceWidth={MOBILE_DESKTOP_SPLIT+1}>
    {children}
  </MediaQuery>
)
