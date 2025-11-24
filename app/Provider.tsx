"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import {GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function WrapperProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <Provider store={store}>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </Provider>
    </GoogleReCaptchaProvider>
  );
}
