'use client'

import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux'
import {persistor, store} from "@/store/store"
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { PropsWithChildren } from 'react'



const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false
    }
  }
})

export default function Providers({children}:PropsWithChildren<unknown>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            {children}
        </AuthProvider>
      </PersistGate>
      </Provider>
   </QueryClientProvider>
  )
 
}
