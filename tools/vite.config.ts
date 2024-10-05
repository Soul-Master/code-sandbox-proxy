import { UserConfig } from 'vite';
import path from 'node:path';
import { findPackageVersion } from './packageUtil.js';

const nodeModulePattern = /(node_modules|packages)\/((@[a-z0-9\-_]+\/)?[a-z0-9\-_]+)/i;
const srcPath = '/src/';
const viteVersion = findPackageVersion(path.resolve('./node_modules/vite/package.json')) ?? '';
const virtualModuleNamePrefix = '\0';

export const userConfig: UserConfig = {
    root: 'src',
    // Force Vite to use relative path instead of absolute path for referencing assets
    base: './',
    build: {
        target: 'esnext',
        ssr: false,
        minify: false,
        cssMinify: false,
        modulePreload: false,
        outDir: path.join(__dirname, "../../dist"),
        
        rollupOptions: {
            output: {
                dir: 'dist',
                chunkFileNames: '[name].js',
                entryFileNames: '[name].js',
                manualChunks(id) {
                    // Exclude virtual module
                    if (id.startsWith(virtualModuleNamePrefix)) return;

                    const nodeModuleMatch = nodeModulePattern.exec(id);
                    if (nodeModuleMatch) {
                        const version = findPackageVersion(id);
                        // Path for node_modules/packages
                        let chunkName = 'packages/' + nodeModuleMatch[2] + (version ? '@' + version : '');

                        return chunkName;
                    }

                    nodeModulePattern.lastIndex = 0;

                    let pathInfo = path.parse(id);
                    let filename = pathInfo.name;

                    if (id.includes('vite/')) {
                        // Special path for `vite` module
                        return `packages/vite@${viteVersion}/${filename}`;
                    }

                    const srcIndex = id.indexOf(srcPath);
                    if (srcIndex < 0) {
                        // Unknown path
                        return filename;
                    }

                    // Preserve path in `src` project
                    const srcRelativePath = id.substring(srcIndex + srcPath.length);
                    pathInfo = path.parse(srcRelativePath);

                    return srcRelativePath.substring(0, srcRelativePath.length - pathInfo.ext.length);
                },
            },
        },
    },
    server: {
        hmr: false,
    },
};

export default userConfig;