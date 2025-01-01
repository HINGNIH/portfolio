import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Footer, Header } from '@/common';

const notoSansKR = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700'],
});

export const metadata = {
    title: '서희원의 포트폴리오',
    description: '서희원의 포트폴리오 입니다. ',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={notoSansKR.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
