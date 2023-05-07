'use client';

import { Nav } from './components/Nav';

import '@styles/global.css';
import { Provider } from './components/Provider';

export const metadata = {
    title: 'Prompt',
    description: 'Discover & Share Command AI Prompts',
};
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
