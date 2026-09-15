/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['upload.wikimedia.org', 'conteudo.imguol.com.br'],
    },
    output: 'standalone',
    async rewrites() {
        return [
            {
            // Tudo que bater em /api/backend/ no navegador...
            source: '/api/backend/:path*',
            // ...será redirecionado internamente para o container NestJS
            destination: 'http://api:3001/:path*',
            },
        ];
    },
};

export default nextConfig;