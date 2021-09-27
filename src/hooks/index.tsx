import React from 'react';

import { FirebaseProvider } from './AuthContext';
import { LoadingProvider } from './loading';

export const Hooks: React.FC = ({ children }) => (
  <LoadingProvider>
    <FirebaseProvider>{children}</FirebaseProvider>
  </LoadingProvider>
);
