import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

interface IAppConfigProviderProps {
  children: ReactNode;
}

export const AppConfigProvider = ({ children }: IAppConfigProviderProps) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#b3db11",
      },
      components: {
        DatePicker: {
          hoverBorderColor: "none",
          activeShadow: "none",
        },
        Input: {
          hoverBorderColor: "none",
          activeShadow: "none",
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);
