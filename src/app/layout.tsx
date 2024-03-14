import Providers from '@/providers/Providers'
import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/seo.constants'
import { getSiteUrl } from '@/config/url.config'
import { Golos_Text } from 'next/font/google'
import "./../assets/styles/style.scss"

export const metadata: Metadata = {
    icons: {
        icon: '/favicon.svg'
    },
    title:{
        absolute: SITE_NAME,
        template: `${SITE_NAME} | %s `
    },
    metadataBase: new URL(getSiteUrl()),
    // для соцсеетей
    openGraph:{
        type: "website",
        siteName: SITE_NAME,
        emails: ["info@decalur.com"]
    }
}

const golos = Golos_Text({
    weight: ["400", '500', '600', '700'],
    subsets: ['latin', 'cyrillic-ext'],
    display: 'swap',
    style: ["normal"],
    variable:  '--font-golos'
})

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <html lang='ru' className={golos.variable}>
            <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <body>
                <Providers>
                    <main className='layout'>{children}</main>
                </Providers>
                <div id="modal"></div>
            </body>
        </html>
    );
}
