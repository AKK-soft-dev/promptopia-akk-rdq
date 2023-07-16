import "@/styles/globals.css";
import DataQueryProviderClient from "@components/DataQueryProviderClient";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

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
            <DataQueryProviderClient>{children}</DataQueryProviderClient>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
