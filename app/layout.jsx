import "@/styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { DataQueryProvider } from "react-data-query";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
  icons: {
    icon: "/public/logo.svg",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            <DataQueryProvider>{children}</DataQueryProvider>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
